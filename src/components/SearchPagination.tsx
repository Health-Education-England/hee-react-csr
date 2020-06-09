import {connectPagination} from 'react-instantsearch-dom';
import React, {Component} from 'react';
import {Pagination} from "nhsuk-react-components";

interface PaginationProps {
    currentRefinement: number,
    nbPages: number,
    refine: any,
    createURL: any
}

class SearchPagination extends Component<PaginationProps> {

    onChange = (event: any, page: number) => {
        event.preventDefault();
        return this.props.refine(page);
    };

    render() {
        let {currentRefinement, nbPages, createURL} = this.props;

        let prevButton;
        if (currentRefinement > 1) {
            const prevPage = currentRefinement - 1;

            prevButton =
                <Pagination.Link previous href={createURL(prevPage)}
                                 onClick={(event) => this.onChange(event, prevPage)}>
                    Page {prevPage} of {nbPages}
                </Pagination.Link>;
        }

        let nextButton;
        if (currentRefinement < nbPages) {
            const nextPage = currentRefinement + 1;

            nextButton =
                <Pagination.Link next href={createURL(nextPage)} onClick={(event) => this.onChange(event, nextPage)}>
                    Page {nextPage} of {nbPages}
                </Pagination.Link>;
        }
        return (
            <div style={{minWidth: 400}}>
                <Pagination>
                    {prevButton}
                    {nextButton}
                </Pagination>
            </div>
        )
    }
}

export default connectPagination(SearchPagination);
