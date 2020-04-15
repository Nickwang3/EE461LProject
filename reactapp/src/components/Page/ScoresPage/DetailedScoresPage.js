import React from 'react';

import ApiService from '../../../api/ApiService';
import BoxScore from './BoxScore';
const apiService = new ApiService();

class DetailedScoresPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            boxscore_id: this.props.match.params.boxscore_id,
            boxscore: null,
            isLoaded: false,
            error: null,

        }
    }

    componentDidMount() {
        apiService.getBoxscoreById(this.state.boxscore_id)
            .then(res => {
                this.setState({
                    boxscore: res.data,
                    isLoaded: true
                })
            })
            .catch(error => {
                this.setState({
                  isLoaded: true,
                  error
                });
            });

    }

    render() {
        const { error, isLoaded, boxscore } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
                <BoxScore boxscore={this.state.boxscore}>Hello</BoxScore>
            </div>
            )
        }
    }
}

export default DetailedScoresPage;