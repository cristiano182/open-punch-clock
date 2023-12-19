import zod from "zod";

export default zod.object(
  {
    name: zod.string(),
    document: zod.string(),
  },
  {
   // required_error: ErrorCode.PARAMS_REQUIRED,
  },
);
