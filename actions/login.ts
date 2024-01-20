"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("values", values);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }
  return {
    success: true,
    data: {
      token: "123456789",
    },
  };
};
