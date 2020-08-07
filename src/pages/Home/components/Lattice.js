import React, { Component } from 'react';
import './Lattice.sass';

var PREDATOR = 1;
var PREY = 0;
var EMPTY = 2;
var C_PREY = 0.3;
var E_PREY = 0.;
var C_PREDATOR = 0.15;
var E_PREDATOR = 0.1;

class Lattice extends Component {
    constructor(props){
        super(props);
        this.state = { state_matrix: null, anim: 1, lattice_size: 30 };
        this.create_lattice = this.create_lattice.bind(this);
        this.draw_from_binomial = this.draw_from_binomial.bind(this);
        this.update_lattice = this.update_lattice.bind(this);

        this.update_predator_cell = this.update_predator_cell.bind(this);
        this.update_prey_cell = this.update_prey_cell.bind(this);

        this.update_cell = this.update_cell.bind(this);

        this.get_neighbors_of_some_state = this.get_neighbors_of_some_state.bind(this);
        this.get_neighbors = this.get_neighbors.bind(this);
        this.get_new_state_matrix = this.get_new_state_matrix.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.are_adjacent = this.are_adjacent.bind(this);


        this.pause = this.pause.bind(this);
    }
    componentWillMount() {
        this.create_lattice();
    }
    componentDidMount() {
        setInterval(this.update_lattice, 100);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pause(){
        this.setState({anim: !this.state.anim});
    }

    /*  =====================================================
    //
    //      initialization functions
    //
    //  ===================================================== */
    init_state_matrix() {
        var lattice_size = this.state.lattice_size;
        var state_matrix = [];
        for (var i = 0; i < lattice_size; i++){
            var row = [];
            for (var j = 0; j < lattice_size; j++){

                var state = EMPTY;
                var denom = 3+5*Math.random();
                if (j < lattice_size/denom){
                    state = PREDATOR;
                }
                else {
                    state = PREY;
                }

                row.push(state);
            }
            state_matrix.push(row);
        }
        return(state_matrix);
    }

    create_lattice() {
        var state_matrix = this.init_state_matrix();
        this.setState({state_matrix: state_matrix});
     }

     boundary_condition(coord) {
        var lattice_size = this.state.lattice_size;
        if (coord >= lattice_size){
            return 0;
        }
        if (coord < 0){
            return lattice_size;
        }
        return coord;
     }

    /*  =====================================================
    //
    //    functions to map between data structures
    //
    //  ===================================================== */

   get_neighbors(x,y) {
        var lattice_size = this.state.lattice_size;
        var neighbors = [];
        // neighbors of x,y
        if (x){
                for (var dx=-1; dx < 2; dx++){
                    for (var dy=-1; dy < 2; dy++){
                      var neighbor_x = x+dx;
                      var neighbor_y = y+dy;

                      neighbor_x = this.boundary_condition(neighbor_x);
                      neighbor_y = this.boundary_condition(neighbor_y);

                      if (!(neighbor_x === x && neighbor_y === y)){
                          var neighbor_obj = {x: neighbor_x, y: neighbor_y};
                          neighbors.push(neighbor_obj);
                      }
                    }
                }
            return neighbors;
        }
       return [];
    }

    get_neighbors_of_some_state(state_matrix, i, j, target_state) {
        var neighbors = this.get_neighbors(i,j);
        var num_neighbors = neighbors.length;
        var return_neighbors = [];
        for (var i = 0; i < num_neighbors; i++){
            var neighbor = neighbors[i];
            var this_state = state_matrix[neighbor.x][neighbor.y];

            if (this_state == target_state){
                return_neighbors.push(neighbors[i]);
            }
        }
        return return_neighbors;
    }

    /*  =====================================================
    //
    //   functions to update the lattice at each time step
    //
    //  ===================================================== */

    draw_from_binomial(n, p){
        var counter = 0;
        var sum = 0;

        while(counter < n){
            if (Math.random() < p) {
                sum += 1;
            }
            counter++;
        }

        return sum;
    }

    are_adjacent(node1, node2){
        if (Math.abs(node1.x - node2.x) <= 1 && Math.abs( node1.y - node2.y) <= 1){
            return true;
        }
        return false;
    }

    update_predator_cell(old_state_matrix, i, j){
        var new_state_matrix = {...old_state_matrix};

        var predator_neighbors = this.get_neighbors_of_some_state(old_state_matrix, i, j, PREDATOR);
        var prey_neighbors = this.get_neighbors_of_some_state(old_state_matrix, i, j, PREY);

        var num_predator_neighbors = predator_neighbors.length;
        var num_prey_neighbors = prey_neighbors.length;

        if (Math.random() < E_PREDATOR){
            new_state_matrix[i][j] = EMPTY;
        }

        if (num_predator_neighbors < 1){
            new_state_matrix[i][j] = EMPTY;
            return new_state_matrix;
        }

        if (num_prey_neighbors < 1){
            return new_state_matrix;
        }


        for (var predator_ct = 0; predator_ct < num_predator_neighbors; predator_ct++){
            for (var prey_ct = 0; prey_ct < num_prey_neighbors; prey_ct++){
                if (this.are_adjacent(prey_neighbors[prey_ct], predator_neighbors[predator_ct])){
                    if (Math.random() < C_PREDATOR){
                        var prey_x = prey_neighbors[prey_ct].x;
                        var prey_y = prey_neighbors[prey_ct].y;
                        new_state_matrix[prey_x][prey_y] = PREDATOR;
                        break;
                    }
                }
            }
        }

        return new_state_matrix;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return(array);
    }

    update_prey_cell(old_state_matrix, i, j){
        var new_state_matrix = {...old_state_matrix};
        var empty_neighbors = this.get_neighbors_of_some_state(old_state_matrix, i, j, EMPTY);
        var num_empty_neighbors = empty_neighbors.length;

        if (Math.random() < E_PREY){
            new_state_matrix[i][j] = EMPTY;
        }

        if (num_empty_neighbors > 0){
            //var num_colonized = this.draw_from_binomial(num_empty_neighbors, C_PREY);
            // if (num_colonized > 0){
            if (Math.random() < C_PREY) {
                empty_neighbors = this.shuffle(empty_neighbors);
                var new_x = empty_neighbors[0].x;
                var new_y = empty_neighbors[0].y;
                new_state_matrix[new_x][new_y] = PREY;
            }
        }
        return new_state_matrix;
    }

    update_cell(old_state_matrix, i, j){
    }

    get_new_state_matrix(old_state_matrix){
        var lattice_size = this.state.lattice_size;
        var new_state_matrix = {...old_state_matrix};

        for (var i = 0; i < lattice_size; i++){
            for (var j = 0; j < lattice_size; j++){
                if (old_state_matrix[i][j] == PREY){
                    new_state_matrix = this.update_prey_cell(old_state_matrix, i, j);
                }
                if (old_state_matrix[i][j] == PREDATOR){
                    new_state_matrix = this.update_predator_cell(old_state_matrix, i, j);
                }
            }
        }

        return(new_state_matrix);
    }

    update_lattice() {
        if (this.state.anim){
        var current_state = {...this.state};
        var old_state_matrix = current_state.state_matrix;

        var new_state_matrix = this.get_new_state_matrix(old_state_matrix);
        this.setState({state_matrix: new_state_matrix});
        }
    }


    /*  =====================================================
    //
    //   render
    //
    //  ===================================================== */

    render() {
       var lattice_size = this.state.lattice_size;
       var state_matrix = this.state.state_matrix;
       var rows = [];

       for (var i = 0; i < lattice_size; i++){
            var this_row = [];
            for (var j = 0; j < lattice_size; j++){
                var state = "state".concat(state_matrix[i][j]);
                 this_row.push( (<div className="cell"><span className={state}></span></div>));
            }
            rows.push(<div className="row">{this_row}</div>)
       }

       return (<div><div className="lattice">{rows}</div>  <div className="pause_button" onClick={this.pause}>pause</div></div>);
   }
}

export default Lattice;
