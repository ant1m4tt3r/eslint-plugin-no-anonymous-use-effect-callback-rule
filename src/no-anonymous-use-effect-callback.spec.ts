import { RuleTester } from "@typescript-eslint/rule-tester";

import rule, { MessageId } from "./no-anonymous-use-effect-callback";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run(MessageId, rule, {
  valid: [
    "useEffect(function saphira() {})",
    "React.useEffect(function saphira() {})",
  ],
  invalid: [
    {
      code: 'import {useEffect} from "react"; useEffect(() => { })',
      errors: [{ messageId: MessageId }],
    },
    {
      code: 'import * as React from "react"; React.useEffect(function () {})',
      errors: [{ messageId: MessageId }],
    },
  ],
});
