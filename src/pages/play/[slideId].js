import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/pages/play.module.css";
import { v4 as uuidv4 } from "uuid";
import getMdxParse from "@/utils/getMdxParse";
import { getSession } from "next-auth/react";
import axios, { all } from "axios";

import PositionNavBtn from "@/components/PositionNavBtn";
import ProgressBar from "@/components/ProgressBar";
import PlaySlideItem from "@/components/play/PlaySlideItem";
import { DEFAULT_SERVER_URL } from "@/constants/url";

export default function play({ slide }) {
  const [allChapter, setAllChapter] = useState(slide.slide.chapters);
  const [allMdx, setAllMdx] = useState(null);
  const [playRow, setPlayRow] = useState(0);
  const [playColumn, setPlayColumn] = useState(0);
  const [progress, setProgress] = useState(0);

  const maxRow = allChapter.reduce((prev, chapters) => {
    const nowRow = chapters.position[0];

    return prev > nowRow ? prev : nowRow;
  });
  const maxColumn = allChapter
    .filter((chapters) => chapters.position[0] === maxRow)
    .reduce((prev, chapters) => {
      const nowColumn = chapters.position[1];

      return prev > nowColumn ? prev : nowColumn;
    });

  async function fetchMdxResult() {
    const result = await Promise.all(
      allChapter.map(async (chapter) => {
        return await getMdxParse(chapter.userCode, {
          position: chapter.position,
          id: uuidv4(),
        });
      }),
    );
    setAllMdx(result);
  }

  useEffect(() => {
    fetchMdxResult();
  }, []);

  useEffect(() => {
    if (!playRow) {
      setProgress(0);
      return;
    }

    const nowProgress = (100 / (maxRow + maxColumn)) * playRow;
    setProgress(nowProgress);
  }, [playRow]);

  useEffect(() => {
    if (!playColumn && !playRow) {
      setProgress(0);
      return;
    }

    const offset = 2;
    let nowProgress;

    if (playRow === maxRow) {
      nowProgress = (100 / allChapter.length) * (playRow + playColumn + offset);
    } else {
      nowProgress = (100 / allChapter.length) * (playRow + playColumn);
    }

    setProgress(nowProgress);
  }, [playColumn]);

  return (
    <main className={styles.wrapper}>
      {allMdx?.map((mdx, index) => (
        <PlaySlideItem
          chapter={mdx}
          key={mdx.id}
          playPosition={{ playRow, playColumn }}
        />
      ))}
      <PositionNavBtn
        setPlayPosition={{ setPlayRow, setPlayColumn }}
        playPosition={{ playRow, playColumn }}
        allChapter={allChapter}
      />
      <ProgressBar progress={progress} />
    </main>
  );
}

export async function getServerSideProps(context) {
  const slideId = context.params.slideId;
  let userName;

  try {
    const session = await getSession(context);
    if (!session)
      return { redirect: { destination: "/signin", permanent: false } };
    userName = session.user.name;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  try {
    const targetSlide = await axios.get(
      `${DEFAULT_SERVER_URL}api/users/${userName}/slides/${slideId}`,
    );
    const slide = targetSlide.data;
    return {
      props: {
        slide,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
