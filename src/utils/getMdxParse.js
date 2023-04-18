import { VFile } from "vfile";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export default async function getMdxParse(code, options) {
  const file = new VFile({
    basename: "example.mdx",
    value: code,
  });

  let result;

  try {
    result = await evaluate(file, {
      ...runtime,
      useDynamicImport: true,
    });
  } catch (error) {
    /**
     * fix: error 발생시 아래 모달 구현 예정
     */
    console.error(error);
  }

  return { mdxResult: result.default(), ...options };
}
