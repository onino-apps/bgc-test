import { calculator } from "./calculator";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { IQuerry } from "./models";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
) {
  const body: IQuerry[] = req.body ? req.body : [];
  const test = calculator.checkArgument(body);
  if (test.error) {
    context.res = {
      status: 400,
      isRaw: true,
      body: test.error.details,
    };
    context.done();
  } else {
    try {
      const res = body.map((d) => ({ ...d, price: calculator.getPrice(d) }));
      context.res = {
        status: 200,
        isRaw: true,
        body: res,
      };
    } catch (e) {
      context.res = {
        status: 500,
        isRaw: true,
        body: e.message,
      };
    }
    context.done();
  }
};

export default httpTrigger;
