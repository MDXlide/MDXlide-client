import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "@/styles/components/SlideItem.module.css";
import { VFile } from "vfile";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import { setRow, setColumn } from "@/features/postionSlice";
import { DEFAULT_SERVER_URL } from "@/constants/url";

export default function SlideItem({ slide, allSlides, setAllSlides }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { title, chapters, lastSaveTime, slideId, userId } = slide;
  const firstChapter = chapters.filter(
    (chapter) => chapter.position[0] === 0 && chapter.position[1] === 0,
  )[0];
  const [mdxResult, setMdxResult] = useState(null);

  useEffect(() => {
    async function parseMdx() {
      const file = new VFile({
        basename: "example.mdx",
        value: firstChapter.userCode,
      });

      let result;

      try {
        result = await evaluate(file, {
          ...runtime,
          useDynamicImport: true,
        });

        setMdxResult(result.default());
      } catch (error) {
        /**
         * fix: error 발생시 아래 모달 구현 예정
         */
        console.error(error);
      }
    }

    parseMdx();
  }, []);

  function handleMoveSlideEdiorPage() {
    router.push(`/editor/${slideId}`);
    dispatch(setRow(0));
    dispatch(setColumn(0));
  }

  async function handleDeleteSlide() {
    const newAllslide = allSlides.filter(
      (item) => item.slideId !== slide.slideId,
    );

    setAllSlides(newAllslide);

    try {
      const result =
        await axios.delete(`${DEFAULT_SERVER_URL}api/users/${userId}/slides/${slideId}
    `);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mdx} onClick={handleMoveSlideEdiorPage}>
        {mdxResult}
      </div>
      <div className={styles.describe}>
        <div className={styles.describeWrapper}>
          <h3>{title}</h3>
          <button className={styles.deleteBtn} onClick={handleDeleteSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12"
              viewBox="0 96 960 960"
              width="12"
            >
              <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" />
            </svg>
            삭제
          </button>
        </div>
        <div className={styles.lastSaveTime}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12"
            viewBox="0 96 960 960"
            width="12"
          >
            <path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z" />
          </svg>
          {lastSaveTime}
        </div>
      </div>
    </div>
  );
}
