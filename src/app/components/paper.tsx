import { useState } from "react";
import { TextFormatter, type PaperInfo } from "../lib";
import { Chart } from "./chart";

const MAX_VISIBLE_AUTHORS = 5;
const MAX_CHARACTERS = 200;

function Abstract({ abstract, keywordsRegExp }: { abstract: string, keywordsRegExp: RegExp }) {
  const [seeMore, setSeeMore] = useState(false);
  const handleToggleSeeMore = () => {
    setSeeMore((pastSeeMore) => !pastSeeMore)
  };

  const seeButton = <button type="button" onClick={handleToggleSeeMore}>
    {`See ${seeMore ? "less" : "more"}`}
  </button>;

  return <div>
    {
      !seeMore && seeButton
    }
    <p dangerouslySetInnerHTML={{
      __html:
        TextFormatter.boldWord(
          `${abstract.slice(0, seeMore ? undefined : MAX_CHARACTERS)}${abstract.length > 0 ?
            "..." : ""}`,
          keywordsRegExp)
    }} />
    {
      seeMore && seeButton
    }
  </div>
}


export function Paper(
  query: string,
  keywords: string[],
  { id, title, authors, yearPublished, publisher, abstract, fieldOfStudy, downloadUrl, documentType }: PaperInfo) {
  const keywordsRegExp = new RegExp(`(${keywords.join('|')})s?`, 'gi');
  return <div key={id} className="paper-object">
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: TextFormatter.boldWord(title, keywordsRegExp) }} />
      <div>
        {
          yearPublished &&
          <p>Published on {yearPublished}</p>
        }
        {
          fieldOfStudy &&
          <p>{TextFormatter.capitalizeFirstLetter(fieldOfStudy)}</p>
        }
        <div className="metadata-row">
          {
            authors &&
            <>
              <p className="meta-header">Authors</p>
              {authors !== null &&
                authors.slice(0, MAX_VISIBLE_AUTHORS).map(({ name }, i) => (
                  <p key={`${id}—${name}—${i}`} className="tag">{name}</p>
                ))
              }
              {
                authors && authors.length > MAX_VISIBLE_AUTHORS &&
                <p className="tag">{authors.length} more authors</p>
              }
            </>
          }
        </div>
        {
          publisher &&
          <div className="metadata-row">
            <p className="meta-header">Publisher</p>
            <p>{TextFormatter.cleanString(publisher)}</p>
          </div>
        }
      </div>
    </div>
    {
      abstract &&
      <div>
        <p className="meta-header">Abstract</p>
        <Abstract abstract={abstract} keywordsRegExp={keywordsRegExp} />
      </div>

    }
    {
      downloadUrl &&
      <div>
        <a href={downloadUrl} target="_blank" rel="noreferrer noopener">Download ↗</a>
      </div>
    }
    <Chart sanitizedQuery={query} title={title ?? ""} abstract={abstract ?? ""} keywords={keywords} />
  </div>
}
