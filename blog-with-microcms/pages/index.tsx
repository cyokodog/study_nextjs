// import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from 'next/font/google';
// import styles from '@/styles/Home.module.css';
// const inter = Inter({ subsets: ['latin'] });

import { client } from '@/libs/client';
import Link from 'next/link';

interface BlogResponse {
  contents: Array<{
    id: string;
    title: string;
  }>;
}

//SSG
export const getStaticProps = async () => {
  const data = await client.get<BlogResponse>({ endpoint: 'blog' });
  return {
    props: { blog: data },
  };
};

export default function Home({ blog }: { blog: BlogResponse }) {
  return (
    <ul>
      {blog.contents.map((item) => (
        <li key={item.id}>
          <Link href={`blog/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
