import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Configure,
    SearchBox,
    connectRefinementList,
    connectHits, connectHighlight, Snippet, connectStats, connectSortBy,
} from 'react-instantsearch-dom';
import * as React from 'react';
import './Search.css';
import {CloseIcon, SearchIcon} from "nhsuk-react-components";
import {Hit, HitsProvided, RefinementListProvided} from "react-instantsearch-core";
import Checkboxes from "nhsuk-react-components/lib/components/checkboxes";
import Pagination from "./SearchPagination";
import Select from "nhsuk-react-components/lib/components/select";

const searchClient = algoliasearch('02F3VJA4YI', 'b20c325ddd93b08a4b9fa792e619d161');

export function Search() {
    return (
        <div className="nhsuk-width-container">
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css'
                  integrity='sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=' crossOrigin='anonymous'/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
                  integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous"/>

            <InstantSearch searchClient={searchClient} indexName="brdocs">
                <div className="left-panel">
                    <div className="custom-refinement-section">
                        <div className="custom-refinement-list">
                            <h5>Category</h5>
                            <CustomRefinementList attribute="category"/>
                        </div>

                        <div className="custom-refinement-list">
                            <h5>Region</h5>
                            <CustomRefinementList attribute="region"/>
                        </div>

                        <div className="custom-refinement-list">
                            <h5>Speciality</h5>
                            <CustomRefinementList attribute="speciality"/>
                        </div>
                    </div>
                    <Configure hitsPerPage={1}/>
                </div>
                <div className="right-panel">
                    <div className="custom-search">
                        <SearchBox submit={<SearchIcon/>} reset={<CloseIcon/>}/>
                    </div>
                    <CustomSortBy
                        defaultRefinement="brdocs"
                        items={[
                            {value: 'brdocs', label: 'Relevance'},
                            {value: 'brdocs_date_desc', label: 'Most recently modified'}
                        ]}
                    />
                    <CustomStats/>
                    <CustomHits/>
                    <Pagination/>
                </div>
            </InstantSearch>
        </div>
    );
}

const CustomHighlight = connectHighlight(({highlight, attribute, hit}) => {
    const parsedHit = highlight({
        highlightProperty: '_highlightResult',
        attribute,
        hit
    });

    return (
        <div>
            {parsedHit.map(
                part => (part.isHighlighted ? <mark>{part.value}</mark> : part.value)
            )}
        </div>
    );
});

interface HitProps {
    hit: {
        content: string,
        title: string,
        introduction: number,
        category: string
    }
}

const Hits = ({hits}: HitsProvided<Hit>) => (
    <div>
        <ul className="nhsuk-list nhsuk-list--border">
            {hits.map(hit => (
                <div>
                    <li>
                        <h2 className="nhsuk-u-margin-bottom-1" style={{"fontWeight": 400, "fontSize": "19px"}}>
                            <a
                                className="app-search-results-item">
                                <CustomHighlight attribute="title" hit={hit}/>
                            </a>
                        </h2>
                        <p className="nhsuk-body-s nhsuk-u-margin-top-1">
                            <CustomHighlight attribute="introduction" hit={hit}/>
                            <Snippet hit={hit} attribute="content"/>;
                            <strong>
                                <CustomHighlight attribute="category" hit={hit}/>
                            </strong>
                        </p>
                    </li>
                </div>
            ))}
        </ul>
    </div>
);

const CustomHits = connectHits(Hits);

const RefinementList = ({items, refine}: RefinementListProvided) => (
    <Checkboxes>
        {items.map(item => (
            <Checkboxes.Box
                key={item.label}
                onClick={() => {
                    return refine(item.value);
                }}
            >
                {item.label} ({item.count})
            </Checkboxes.Box>
        ))}
    </Checkboxes>
);

const CustomRefinementList = connectRefinementList(RefinementList);

interface StatsProvided {
    nbHits: number;
    processingTimeMS: number;
}

const Stats = ({nbHits}: StatsProvided) => (
    <p className="nhsuk-body-s nhsuk-u-margin-bottom-3" style={{paddingLeft: "65%", paddingBottom: '20px'}}>
        Found <b>{nbHits}</b> matching results.
    </p>
);

const CustomStats = connectStats(Stats);


const SortBy = ({items, refine, createURL}: any) => (
    <Select
        id="select-1"
        label="Sort by"
        onChange={(event: any) => {
            event.preventDefault();
            refine(event.target.value)
        }}
        style={{fontSize: "16px"}}
    >
        {items.map((item: { value: string, label: string, isRefined: boolean }) => (
            <Select.Option
                value={item.value}
                href={createURL(item.value)}>
                {item.label}
            </Select.Option>
        ))}
    </Select>
);

const CustomSortBy = connectSortBy(SortBy);