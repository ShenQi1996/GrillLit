import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router-dom';

class Filter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputVal: ''
        };
        this.selectName = this.selectName.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event){
        // debugger
        this.setState({ inputVal: event.currentTarget.value });
    }

    matches(){
        // debugger
        const matches = [];
        if(this.state.inputVal.length === 0) {
            return this.props.events;
        }

        this.props.events.forEach(event => {
            const sub = event.title.slice(0, this.state.inputVal.length);
            if(sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
                matches.push(event);
            }
        });

        if(matches.length === 0){
            matches.push('No matches');
        }

        return matches;
    }

    selectName(event){
        const name = event.title;
        this.setState({ inputVal: name });
    }
    
    render(){
    // debugger;    
    const results = this.matches();
    // debugger;    
        // console.log(results);
        if(results.length !== 0 ){
            // debugger
            results.map((result, i) => {
                return (
                    <li key={i} onClick={this.selectName(result)}>{result}</li>
                );
            });
        } else {
            return 'no good';
        }

        return (
            <div>
                <div className="auto">
                    <input
                        onChange={this.handleInput}
                        value={this.state.inputVal}
                        placeholder='Search...'
                    />
                    <ul>
                        <ReactCSSTransitionGroup
                            transitionName='auto'
                            transitionEnterTimeout={600}
                            transitionLeaveTimeout={600}>
                            {/* {results} */}
                        </ReactCSSTransitionGroup>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Filter);