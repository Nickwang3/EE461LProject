import React from "react";
import { Button, Row , Form, FormGroup, Input, Label, Col} from "reactstrap"

class SearchController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          results: [],
          page: 1,
          prevPage: null,
          nextPage: null,
          count: null,
          searchValue: '', 
          searchFields: this.props.defaultSearchField,
          ordering: this.props.defaultOrdering,
        };
    }



    onSubmit = (e) => {
        e.preventDefault()
        this.props.setResults([], false, null);
        this.props.getResults(1, this.state.searchValue, this.state.searchFields, this.state.ordering)
        .then(result => {
          this.setState({
            isLoaded: true,
            results: result.data.results,
            page: 1,
            prevPage: result.data.previous,
            nextPage: result.data.next,
            count: result.data.count
          });
          this.props.setResults(result.data.results, true, null);
        })
        .catch(error => {
            this.props.setResults(null, true, error);
        });
    }
    
    onEnterPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            this.onSubmit(e);
        }
    }
    
    orderingChanged = (e) => {
        this.setState({ 
            ordering: e.target.value,
        })
        this.props.setResults([], false, null);
        this.props.getResults(1, this.state.searchValue, this.state.searchFields, e.target.value)
        .then(result => {
            this.setState({
            isLoaded: true,
            results: result.data.results,
            page: 1,
            prevPage: result.data.previous,
            nextPage: result.data.next,
            count: result.data.count
            });
            this.props.setResults(result.data.results, true, null);
        })
        .catch(error => {
            this.props.setResults(null, true, error);
        });
    }

    render() {
        return (
                <Form className="playerFormStyle" onSubmit={this.onSubmit}>
                    <Row form>
                    <Col md={9}>
                        <FormGroup className="playerSearchBar">
                            <Input
                            type="search"
                            name="search"
                            id="resultSearch"
                            placeholder={this.props.placeholderText}
                            value={this.state.searchValue}
                            onChange={e => this.setState({ searchValue: e.target.value })}
                            onKeyDown={this.onEnterPressed}
                            style={{width: "100%"}}
                            />
                        </FormGroup>
                    </Col>
                    <Col style={{display:"flex", justifyContent: "center"}} md={3}>
                        <Button className="playerSearchButtonStyle" style={{width: "80%", height: "70%"}} type="submit" className="btn btn-success">Search</Button>
                    </Col>
                    </Row>
                    <Row form>
                    <Col md={6}>
                        <FormGroup >
                            <Label style={{fontSize: "medium"}} for="resultSearchSelect">Search by</Label>
                            <Input 
                            type="select" 
                            name="resultSearchSelect" 
                            id="resultSearchSelect"
                            onChange={e => this.setState({ searchFields: e.target.value })}
                            >
                                {this.props.searchFieldOptions.map(searchFieldOption => (
                                    <option>{searchFieldOption}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label style={{fontSize: "medium"}} for="resultOrderSelect">Order by</Label>
                            <Input 
                            type="select" 
                            name="resultOrderSelect" 
                            id="resultOrderSelect"
                            onChange={e => this.orderingChanged(e)}
                            >
                                {this.props.orderingOptions.map(orderingOption => (
                                    <option>{orderingOption}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                </Form>   
            );
    }
} export default SearchController;