/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from "./JudgeConfig";
import type { TestCase } from "./TestCase";

export type QuestionAddRequest = {
  answer?: string;
  content?: string;
  difficulty?: number;
  initialCode?: string;
  judgeCase?: Array<TestCase>;
  judgeCode?: string;
  judgeConfig?: JudgeConfig;
  tags?: Array<string>;
  title?: string;
};
