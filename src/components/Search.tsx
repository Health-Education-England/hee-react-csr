import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Hits,
    Highlight, ClearRefinements, Configure, Pagination, SearchBox, connectRefinementList, HitsProps, connectHits
} from 'react-instantsearch-dom';
import * as React from 'react';
import './Search.css';
import {CloseIcon, SearchIcon} from "nhsuk-react-components";
import {Hit, HitsProvided, RefinementListProvided} from "react-instantsearch-core";
import Checkboxes from "nhsuk-react-components/lib/components/checkboxes";
import {SyntheticEvent} from "react";

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
                    <h2>Title</h2>
                    <CustomRefinementList attribute="title"/>
                    <Configure hitsPerPage={8}/>
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

{/*<div className="nhsuk-grid-column-two-thirds">*/
}
{/*    <p className="nhsuk-body-s nhsuk-u-margin-bottom-3">*/
}
{/*        Found <b>13,384</b> matching results.*/
}
{/*    </p>*/
}

{/*    <ul className="nhsuk-list nhsuk-list--border">*/
}
// </ul>
// </div>

// style={{"font-weight": 400;font-size: 19px}}

const AdaHits = ({ hits }: HitsProvided<Hit>) => (
    <div>
        <p className="nhsuk-body-s nhsuk-u-margin-bottom-3">
            Found <b>{hits.length}</b> matching results.
        </p>

        <ul className="nhsuk-list nhsuk-list--border">
            {hits.map(hit => (
                <li>
                    <h2 className="nhsuk-u-margin-bottom-1" ><a
                        // href="/s/redirect?collection=nhs-meta&amp;url=https%3A%2F%2Fwww.nhs.uk%2Fconditions%2Fcoronavirus-covid-19%2F&amp;index_url=https%3A%2F%2Fwww.nhs.uk%2Fconditions%2Fcoronavirus-covid-19%2F&amp;auth=9DLNygjIvBRExOGMWy%2BSoQ&amp;profile=_default&amp;rank=1&amp;query=covid"
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

const CustomHits = connectHits(AdaHits);

// function AdaHit(props: HitProps) {
//     return (
//         <li>
//             <h2 className="nhsuk-u-margin-bottom-1" ><a
//                 href="/s/redirect?collection=nhs-meta&amp;url=https%3A%2F%2Fwww.nhs.uk%2Fconditions%2Fcoronavirus-covid-19%2F&amp;index_url=https%3A%2F%2Fwww.nhs.uk%2Fconditions%2Fcoronavirus-covid-19%2F&amp;auth=9DLNygjIvBRExOGMWy%2BSoQ&amp;profile=_default&amp;rank=1&amp;query=covid"
//                 className="app-search-results-item">
//                 {props.hit.title} </a></h2>
//             <p className="nhsuk-body-s nhsuk-u-margin-top-1">
//                 {props.hit.introduction} (<strong>{props.hit.category}</strong>).
//             </p>
//         </li>
//     );
// }

// <article>
//     <h1>
//         <Highlight attribute="title" hit={props.hit}/>
//     </h1>
//     <p>
//         <Highlight attribute="introduction" hit={props.hit}/>
//     </p>
//     <p>
//         <Highlight attribute="content" hit={props.hit}/>
//     </p>
//     <p>
//         <Highlight attribute="category" hit={props.hit}/>
//     </p>
// </article>

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
