import Articles from "../../src/components/articles/Articles";
import AddArticle from "../components/AddArticle/AddArticle";

export default function Homepage() {
  return (
    <div className="homepage-container">
      <AddArticle />
      <Articles />
    </div>
  );
}
