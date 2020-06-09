import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Highlight,
    ClearRefinements,
    Configure,
    SearchBox,
    connectRefinementList,
    HitsProps,
    connectHits,
    connectPagination
} from 'react-instantsearch-dom';
import * as React from 'react';
import './Search.css';
import {CloseIcon, SearchIcon} from "nhsuk-react-components";
import {Hit, HitsProvided, RefinementListProvided} from "react-instantsearch-core";
import Checkboxes from "nhsuk-react-components/lib/components/checkboxes";
import {SyntheticEvent} from "react";
import Pagination from "./SearchPagination";

const searchClient = algoliasearch('UDB415NOQA', 'e2ae2995fd3b2f102b60a245e2e786e1');

export function Search() {
    return (
        <div className="nhsuk-width-container">
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css'
                  integrity='sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=' crossOrigin='anonymous'/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
                  integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous"/>

            <InstantSearch searchClient={searchClient} indexName="brdocs">
                <div className="left-panel">
                    <ClearRefinements/>
                    <h2>Category</h2>
                    <CustomRefinementList attribute="category"/>
                    <Configure hitsPerPage={1}/>
                </div>
                <div className="right-panel">
                    <div className="custom-search">
                        <SearchBox submit={<SearchIcon/>} reset={<CloseIcon/>}/>
                    </div>
                    <CustomHits/>
                    <Pagination/>
                </div>

            </InstantSearch>
        </div>
    );
}


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
        <p className="nhsuk-body-s nhsuk-u-margin-bottom-3">
            Found <b>{hits.length}</b> matching results.
        </p>

        <ul className="nhsuk-list nhsuk-list--border">
            {hits.map(hit => (
                <li>
                    <h2 className="nhsuk-u-margin-bottom-1" style={{"fontWeight": 400, "fontSize": "19px"}}><a
                        className="app-search-results-item">
                        {hit.title} </a></h2>
                    <p className="nhsuk-body-s nhsuk-u-margin-top-1">
                        {hit.introduction} (<strong>{hit.category}</strong>).
                    </p>
                </li>
            ))}
        </ul>
    </div>
);

const CustomHits = connectHits(Hits);

const RefinementList = ({items, refine}: RefinementListProvided) => (
    <Checkboxes onChange={(e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = items.filter(item => item.label === target.value)[0].value;
        refine(item);
    }}>
        {items.map(item => (
            <Checkboxes.Box value={item.label}>{item.label} ({item.count})</Checkboxes.Box>
        ))}
    </Checkboxes>
);

const CustomRefinementList = connectRefinementList(RefinementList);
