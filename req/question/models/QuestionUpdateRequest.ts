/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from "./JudgeConfig";
import type { TestCase } from "./TestCase";

export type QuestionUpdateRequest = {
  answer?: string;
  content?: string;
  id?: number;
  judgeCase?: Array<TestCase>;
  judgeConfig?: JudgeConfig;
  tags?: Array<string>;
  title?: string;
};
