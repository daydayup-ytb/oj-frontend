/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InputItem } from "./InputItem";
import type { OutputItem } from "./OutputItem";

export type QuestionRunResultVo = {
  id?: number;
  code?: number;
  executeTime?: number;
  expectOutput?: Array<OutputItem>;
  input?: Array<InputItem>;
  message?: string;
  output?: Array<OutputItem>;
};
