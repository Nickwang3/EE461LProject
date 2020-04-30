import React from "react";
import { Button, Row , Form, FormGroup, Input, Label, Col} from "reactstrap"

class PaginationController extends React.Component {
    constructor(props) {
        super(props);
    }

    nextPage() {
        if (this.props.nextPage == null) {
          return;
        }
        this.props.setResults(false, null, [], this.props.page, this.props.prevPage, this.props.nextPage, 0, this.props.searchValue, this.props.searchFields, this.props.ordering);
        this.props.getResults(this.props.page + 1, this.props.searchValue, this.props.searchFields, this.props.ordering)
            .then(result => {
                this.props.setResults(true, null, result.data.results, this.props.page + 1, result.data.previous, result.data.next, result.data.count, this.props.searchValue, this.props.searchFields, this.props.ordering);
            })
            .catch(error => {
                this.props.setResults(true, error, [], this.props.page, this.props.prevPage, this.props.nextPage, 0, this.props.searchValue, this.props.searchFields, this.props.ordering);
            });
    }
    
    prevPage() {
        if (this.props.prevPage == null) {
            return;
        }
        this.props.setResults(false, null, [], this.props.page, this.props.prevPage, this.props.nextPage, 0, this.props.searchValue, this.props.searchFields, this.props.ordering);
        this.props.getResults(this.props.page - 1, this.props.searchValue, this.props.searchFields, this.props.ordering)
            .then(result => {
                this.props.setResults(true, null, result.data.results, this.props.page - 1, result.data.previous, result.data.next, result.data.count, this.props.searchValue, this.props.searchFields, this.props.ordering);
            })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
                this.props.setResults(true, error, [], this.props.page, this.props.prevPage, this.props.nextPage, 0, this.props.searchValue, this.props.searchFields, this.props.ordering);
            });
    }

    render() {
        return (
            <Row style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Button style={{margin: "20px"}} color="info" onClick={() => this.prevPage()} disabled={this.props.prevPage == null}>Previous</Button>
                <h4 style={{margin: "23px"}}>Page {this.props.page}</h4>
                <Button style={{margin: "20px"}} color="info" onClick={() => this.nextPage()} disabled={this.props.nextPage == null}>Next</Button>
            </Row>    
            );
    }
} export default PaginationController;