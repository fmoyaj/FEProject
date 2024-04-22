import { HTMLAttributes } from "react";
import { TextFormatter, type PaperInfo } from "../lib";
import { useDisclosure } from '../utils/hooks';
import { AccordionRow } from './accordionRow';
import { ArrowIcon } from './arrowIcon';
import { DownCaretIcon } from './down-caret';
import { ExpandableLabel } from "./expandableLabel";
import { MainInfoRow } from './mainInfoRow';

const MAX_VISIBLE_AUTHORS = 5;
const MAX_CHARACTERS = 360;

function Abstract({ abstract, keywordsRegExp }: { abstract: string, keywordsRegExp: RegExp }) {
  const { isOpen, toggleOpen } = useDisclosure();

  const viewMoreButton = <ExpandableLabel
    label={{ open: 'View less', closed: 'View more', isEnd: true }}
    isOpen={isOpen}
    toggleOpen={toggleOpen}
    indicator={(style) => <DownCaretIcon style={style as HTMLAttributes<SVGAElement>} />}
  />

  return <div>
    <p className="accordion-button">Abstract</p>
    <div className='abstract'>
      <p dangerouslySetInnerHTML={{
        __html:
          TextFormatter.boldWord(
            `${abstract.slice(0, isOpen ? undefined : MAX_CHARACTERS)}${abstract.length > 0 ?
              "..." : ""}`,
            keywordsRegExp)
      }} />
      {
        abstract.length > MAX_CHARACTERS &&
        viewMoreButton
      }
    </div>
  </div>
}


export function Paper(
  keywords: string[],
  { id, title, authors, yearPublished, publisher, abstract, downloadUrl, fieldOfStudy }: PaperInfo) {
  const keywordsRegExp = new RegExp(`(${keywords.join('|')})s?`, 'gi');
  const isBasicInfoAvailable = yearPublished || publisher;

  return <div key={id} className="paper-object">
    <div className='flex-col'>
      <h3 dangerouslySetInnerHTML={{ __html: TextFormatter.boldWord(title, keywordsRegExp) }} />
      <div>
        {
          isBasicInfoAvailable &&
          <table>
            <tbody>
              {
                yearPublished &&
                <MainInfoRow label='Date published' info={yearPublished} />
              }
              {
                publisher &&
                <MainInfoRow label='Publisher' info={TextFormatter.cleanString(publisher)} />
              }
            </tbody>
          </table>
        }
        {
          authors &&
          <div>
            <AccordionRow label='Authors'>
              <div className="flex-row">
                {
                  authors &&
                  <>
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
            </AccordionRow>
          </div>
        }
      </div>
      <div>
        {
          abstract &&
          <Abstract abstract={abstract} keywordsRegExp={keywordsRegExp} />

        }
      </div>
      <div className='flex-row'>
        {
          downloadUrl &&
          <a href={downloadUrl} target="_blank" rel="noreferrer noopener" className='secondary-button'>
            <span>Download</span>
            <ArrowIcon />
          </a>
        }
        {/* <PaperChart title={title ?? ""} abstract={abstract ?? ""} keywords={keywords} /> */}
      </div>
    </div>
  </div>
}
