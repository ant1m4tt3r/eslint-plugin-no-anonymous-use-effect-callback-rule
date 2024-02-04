import { AST_NODE_TYPES, TSESLint, TSESTree } from "@typescript-eslint/utils";

export const MessageId = "no-anonymous-use-effect-callback" as const;

const REACT_TAG = "React";
const USE_EFFECT_TAG = "useEffect";

const rule: TSESLint.RuleModule<typeof MessageId> = {
  defaultOptions: [],
  meta: {
    type: "layout",
    messages: {
      [MessageId]:
        "Functions passed to `useEffect` must be named to document intent. More info: https://x.com/housecor/status/1750980809874436431.",
    },
    schema: [],
  },
  create: function (context) {
    return {
      CallExpression(node) {
        if (
          ![
            AST_NODE_TYPES.Identifier,
            AST_NODE_TYPES.MemberExpression,
          ].includes(node.callee.type)
        ) {
          return;
        }

        let callee = node.callee as TSESTree.MemberExpression;

        // React.useEffect
        const isReactUseEffect =
          callee.object &&
          callee.object.type === AST_NODE_TYPES.Identifier &&
          callee.object.name === REACT_TAG &&
          callee.property &&
          callee.property.type === AST_NODE_TYPES.Identifier &&
          callee.property.name === USE_EFFECT_TAG;

        // useEffect
        const isRegularUseEffect =
          (node.callee as TSESTree.Identifier).name === USE_EFFECT_TAG;

        if (
          (isReactUseEffect || isRegularUseEffect) &&
          node.arguments.length > 0
        ) {
          const firstArgument: TSESTree.CallExpressionArgument =
            node.arguments[0]!;
          if (
            firstArgument.type === AST_NODE_TYPES.ArrowFunctionExpression ||
            firstArgument.type === AST_NODE_TYPES.FunctionExpression
          ) {
            const doesNotHaveIdentifier =
              !firstArgument.id || !firstArgument.id.name;
            if (doesNotHaveIdentifier) {
              context.report({
                node: node.parent,
                messageId: MessageId,
              });
            }
          }
        }
      },
    };
  },
};

export default rule;
