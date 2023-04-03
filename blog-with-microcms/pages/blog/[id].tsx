import { client } from '@/libs/client';
import styles from '../../styles/Home.module.scss';

interface BlogByIdResponse {
  title: string;
  publishedAt: string;
  body: string;
}

export const getStaticProps = async (context: {
  params: {
    id: string;
  };
}) => {
  const id = context.params.id;
  const data = await client.get<BlogByIdResponse>({
    endpoint: 'blog',
    contentId: id,
  });
  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get<{ contents: Array<{ id: string }> }>({
    endpoint: 'blog',
  });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false, //設定パス以外は404になる
  };
};

export default function BlogId({ blog }: { blog: BlogByIdResponse }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{ __html: blog.body }}
      ></div>
    </main>
  );
}
