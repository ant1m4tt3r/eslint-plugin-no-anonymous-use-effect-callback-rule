import { TSESLint } from "@typescript-eslint/utils";
import rule from "./no-anonymous-use-effect-callback";

const plugin = {
  rules: {
    base: rule,
  } satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>,
};

export = plugin;
