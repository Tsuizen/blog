import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { getLayout } from '@/layout/Default';
import getAllTags from '@/utils/tags';

const FONTSIZE_MIN = 16;
const FONTSIZE_MAX = 40;
const OPACITY_MIN = 0;
const OPACITY_MAX = 1;

export async function getStaticProps() {
  const tags = await getAllTags();

  return {
    props: {
      tags: Object.values(tags)
    }
  };
}

export default function Tag(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { tags } = props;
  const totalTagsNum = tags.reduce((pre, cur) => pre + cur.postsNum, 0);

  return (
    <div className="w-1/2 mx-auto text-center my-32">
      <h1 className="">标签</h1>
      <div className="flex items-baseline">
        {tags.map((tag) => (
          <div
            className="p-4 link link-hover"
            key={tag.name}
            style={{
              fontSize: Math.min(
                FONTSIZE_MIN +
                  ((tag.postsNum / totalTagsNum) *
                    (FONTSIZE_MAX - FONTSIZE_MIN)) /
                    0.5,
                FONTSIZE_MAX
              ),
              opacity: Math.min(
                OPACITY_MIN +
                  ((tag.postsNum / totalTagsNum) *
                    (OPACITY_MAX - OPACITY_MIN)) /
                    0.3,
                OPACITY_MAX
              )
            }}
          >
            <Link href={`/tag/${tag.name}`}>{tag.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Tag.getLayout = getLayout;
