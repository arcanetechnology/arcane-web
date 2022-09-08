/** @format */
import { GetStaticProps } from 'next';

const Article = () => {};

export default Article;

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  return { props: {} };
};
