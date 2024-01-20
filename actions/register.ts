"use server";
import * as z from "zod";
import { RegisterSchema } from "../schemas";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("values", values);
  const validatedFields = RegisterSchema.safeParse(values);
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
