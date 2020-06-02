import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    SearchBox,
    Hits,
    Highlight, ClearRefinements, RefinementList, Configure, Pagination
} from 'react-instantsearch-dom';
import * as React from 'react';
import './Search.css';

const searchClient = algoliasearch('UDB415NOQA', 'e2ae2995fd3b2f102b60a245e2e786e1');

export function Search() {
    return (
        <div>
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css'
                  integrity='sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=' crossOrigin='anonymous'/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
                  integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous"/>

            <InstantSearch searchClient={searchClient} indexName="brdocs">
                <div className="left-panel">
                    <ClearRefinements/>
                    <h2>Category</h2>
                    <RefinementList attribute="category"/>
                    <h2>Title</h2>
                    <RefinementList attribute="title"/>
                    <Configure hitsPerPage={8}/>
                </div>
                <div className="right-panel">
                    <SearchBox/>
                    <Hits hitComponent={Hit}/>
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
        category: string,
        isRequired: boolean
    }
}

function Hit(props: HitProps) {
    return (
        <article>
            <h1>
                <Highlight attribute="title" hit={props.hit}/>
            </h1>
            <p>
                <Highlight attribute="introduction" hit={props.hit}/>
            </p>
            <p>
                <Highlight attribute="content" hit={props.hit}/>
            </p>
            <p>
                <Highlight attribute="category" hit={props.hit}/>
            </p>
        </article>
    );
}
