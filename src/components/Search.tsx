import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Configure,
    SearchBox,
    connectRefinementList,
    connectHits,
    Snippet,
    connectStats,
    connectSortBy,
    Highlight,
} from 'react-instantsearch-dom';
import * as React from 'react';
import './Search.css';
import {CloseIcon, SearchIcon} from "nhsuk-react-components";
import {Hit, HitsProvided, RefinementListProvided} from "react-instantsearch-core";
import Checkboxes from "nhsuk-react-components/lib/components/checkboxes";
import Pagination from "./SearchPagination";
import Select from "nhsuk-react-components/lib/components/select";
import {BrProps} from "@bloomreach/react-sdk";

export function Search(props: BrProps) {

    const indexName = props.component.getParameters()['indexName'] || '';
    const appId = props.component.getParameters()['appId'] || '';
    const apiKey = props.component.getParameters()['apiKey'] || '';

    if (!indexName || !apiKey || !appId) {
        console.log("Search component is not configured correctly!");
        return null;
    }

    const searchClient = algoliasearch(appId, apiKey);

    return (
        <div className="nhsuk-width-container">
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css'
                  integrity='sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=' crossOrigin='anonymous'/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
                  integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous"/>

            <InstantSearch searchClient={searchClient} indexName={indexName}>
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
                    <Configure hitsPerPage={5}/>
                </div>
                <div className="right-panel">
                    <div className="custom-search">
                        <SearchBox submit={<SearchIcon/>} reset={<CloseIcon/>}/>
                    </div>
                    <CustomSortBy
                        defaultRefinement="articles"
                        items={[
                            {value: 'articles', label: 'Relevance'},
                            {value: 'articles_date_desc', label: 'Most recently modified'}
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

const Hits = ({hits}: HitsProvided<Hit>) => (
    <div>
        <ul className="nhsuk-list nhsuk-list--border">
            {hits.map(hit => (
                <div key={hit.objectID}>
                    <li>
                        <h2 className="nhsuk-u-margin-bottom-1" style={{"fontWeight": 400, "fontSize": "19px"}}>
                            <a
                                className="app-search-results-item" href={`/site/${hit.path}`}>
                                <Highlight attribute="title" hit={hit}/>
                            </a>
                        </h2>
                        <p className="nhsuk-body-s nhsuk-u-margin-top-1">
                            <Highlight attribute="introduction" hit={hit}/>
                            <Snippet hit={hit} attribute="summary"/>;
                            <strong>
                                <Highlight attribute="category" hit={hit}/>
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
        label="Sort by"
        onChange={(event: any) => {
            event.preventDefault();
            refine(event.target.value)
        }}
        style={{fontSize: "16px"}}
    >
        {items.map((item: { value: string, label: string, isRefined: boolean }) => (
            <Select.Option
                key={item.value}
                value={item.value}
                href={createURL(item.value)}>
                {item.label}
            </Select.Option>
        ))}
    </Select>
);

const CustomSortBy = connectSortBy(SortBy);