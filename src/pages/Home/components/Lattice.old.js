import React, { Component } from 'react';
import './Lattice.sass';

var PREDATOR = 1;
var PREY = 0;
var EMPTY = 2;

var C_PREY = 0.1;

class Lattice extends Component {
    constructor(props){
        super(props);
        this.create_lattice = this.create_lattice.bind(this);
        this.get_new_prey_list = this.get_new_prey_list.bind(this);
        this.get_new_predator_list = this.get_new_prey_list.bind(this);
        this.get_unoccupied_neighbors = this.get_unoccupied_neighbors.bind(this);
        this.draw_from_binomial = this.draw_from_binomial.bind(this);
        this.update_lattice = this.update_lattice.bind(this);
        this.get_neighbors = this.get_neighbors.bind(this);
        this.init_node_list = this.init_node_list.bind(this);
        this.get_new_state_matrix = this.get_new_state_matrix.bind(this);
        this.get_x = this.get_x.bind(this);
        this.get_y = this.get_y.bind(this);
        this.get_node_index = this.get_node_index.bind(this);
        this.pause = this.pause.bind(this);
        this.state = { lattice: null, anim: 1, lattice_size:25 };
    }
    componentWillMount() {
        this.create_lattice();
    }
    componentDidMount() {
        setInterval(this.update_lattice, 1000);
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
    init_node_list() {
        var lattice_size = this.state.lattice_size;
        var num_nodes = lattice_size*lattice_size;
        var nodes = [];
        for (var i = 0; i < num_nodes; i++){
            var x_coord = this.get_x(i);
            var y_coord = this.get_y(i);
            var neighbors = this.get_neighbors(x_coord, y_coord);
            var node_obj = {ct: i, x: x_coord, y: y_coord, neighbors: neighbors, state: EMPTY};
            nodes.push(node_obj);
        }
        return nodes;
    }

    init_state_matrix(node_list) {
        var lattice_size = this.state.lattice_size;
        var state_matrix = [];
        for (var i = 0; i < lattice_size; i++){
            var row = [];
            for (var j = 0; j < lattice_size; j++){
                var state = Math.round(2*Math.random());
                var node_index = this.get_node_index(i,j);
                row.push(state);
                node_list[node_index].state = state;
            }
            state_matrix.push(row);
        }
        return(state_matrix);
    }

    create_lattice() {
        var node_list = this.init_node_list();
        var state_matrix = this.init_state_matrix(node_list);

        var prey_list = this.get_prey_list(node_list);
        var predator_list = this.get_predator_list(node_list);

        this.setState({prey_list: prey_list, predator_list: predator_list, node_list: node_list, state_matrix: state_matrix});
     }

     boundary_condition(coord) {
        var lattice_size = this.state.lattice_size;
        if (coord >= lattice_size){
            return 0;
        }
        if (coord < 0){
            return lattice_size-1;
        }
        return coord;
     }

    /*  =====================================================
    //
    //    functions to map between data structures
    //
    //  ===================================================== */

    get_x(node_ct) {
        // x is the row count
        var lattice_size = this.state.lattice_size;
        var row = Math.floor(node_ct / lattice_size);
        return row;
    }

    get_y(node_ct) {
        // y is the column
        var lattice_size = this.state.lattice_size;
        var col = node_ct % lattice_size;
        return col;
    }

    get_node_index(x,y) {
        var lattice_size = this.state.lattice_size;
        var index = lattice_size*x + y;
        return index;
    }

    get_prey_list(node_list){
        var num_nodes = node_list.length;
        var prey_list = [];
        for (var i = 0; i < num_nodes; i++){
          if (node_list[i].state == PREY){
              prey_list.push(node_list[i]);
          }
        }
        return prey_list;
    }

    get_predator_list(node_list){
        var num_nodes = node_list.length;
        var predator_list = [];
        for (var i = 0; i < num_nodes; i++){
          if (node_list[i].state == PREDATOR){
              predator_list.push(node_list[i]);
          }
        }
        return predator_list;
    }

    get_neighbors(x,y) {
        var lattice_size = this.state.lattice_size;
        var neighbors = [];
        // neighbors of x,y
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

    get_unoccupied_neighbors(neighbors, state_matrix) {
        var num_neighbors = neighbors.length;

        var unoccupied_neighbors = [];
        for (var i = 0; i < num_neighbors; i++){
            var this_neighbor = neighbors[i];
            var x = this_neighbor.x;
            var y = this_neighbor.y;
            var this_state = state_matrix[x][y];

            if (this_state == EMPTY){
                unoccupied_neighbors.push(neighbors[i]);
            }
        }
        return unoccupied_neighbors;
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

    // Each occupied prey cell goes extinct w/ probability  E_prey
    // and spreads to an unoccupied neighbor w/ probabiblity C_prey
    get_new_prey_list(old_prey_list, old_state_matrix){

        var node_list = this.state.node_list;

        var new_prey_list = [];
        var new_state_matrix = {...old_state_matrix};

        var num_prey = old_prey_list.length;
        for (var i = 0; i < num_prey; i++){
            var this_prey = old_prey_list[i];
            var unoccupied_neighbors = this.get_unoccupied_neighbors(this_prey.neighbors, old_state_matrix);
            var num_unoccupied_neighbors = unoccupied_neighbors.length;

            // draw from binomial(num_unoccupied_neighbors, C_prey)
            var num_new_prey = this.draw_from_binomial(num_unoccupied_neighbors, C_PREY);

            for (var new_prey = 0; new_prey < num_new_prey; new_prey++){
                var this_neighbor = unoccupied_neighbors[new_prey];
                var new_prey_index = this.get_node_index(this_neighbor.x, this_neighbor.y);
                var old_node_object = node_list[new_prey_index];
                old_node_object.state = PREY;
                new_prey_list.push(old_node_object);
            }

        }
        return new_prey_list;
    }

    // Each predator goes extinct w/ probability E_predator
    // and, IF two predators are adjacent to a prey cell,
    // they spread to that prey cell w/ probability C_predator
    get_new_predator_list(old_predator_list, old_state_matrix){

        //console.log(old_predator_list);
    }

    get_new_state_matrix(prey_list, predator_list){
        var node_list = this.state.node_list;

        var lattice_size = this.state.lattice_size;
        var state_matrix = [];
        for (var i = 0; i < lattice_size; i++){
            var row = [];
            for (var j = 0; j < lattice_size; j++){
                row.push(EMPTY);
            }
            var nodelist_index = this.get_node_index(i,j);
            if (nodelist_index >= 0 && nodelist_index < lattice_size){
                node_list[nodelist_index].state = EMPTY
            }

            state_matrix.push(row);
        }

        var num_prey = prey_list.length;
        for (var i = 0; i < num_prey; i++){
            var this_prey = prey_list[i];
            var x = this_prey.x;
            var y = this_prey.y;
            state_matrix[x][y] = PREY;

            var nodelist_index = this.get_node_index(x,y);
            node_list[nodelist_index].state = PREY;

        }

        var num_predators = predator_list.length;
        for (var i = 0; i < num_predators; i++){
            var this_pred = predator_list[i];
            var x = this_pred.x;
            var y = this_pred.y;
            state_matrix[x][y] = PREDATOR;

            var nodelist_index = this.get_node_index(x,y);
            console.log(nodelist_index);
            node_list[nodelist_index].state = PREDATOR;
        }
        return(state_matrix);
    }

    update_lattice() {
        var current_state = {...this.state};
        var new_prey = this.get_new_prey_list(current_state.prey_list, current_state.state_matrix, current_state.node_list);
        var new_predator = this.get_new_predator_list(current_state.predator_list, current_state.state_matrix);

        var new_state_matrix = this.get_new_state_matrix(new_prey, new_predator);

        this.setState({prey_list: new_prey, predator_list: new_predator, state_matrix: new_state_matrix})
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
/*
    get_neighbors(i, j){
        var N = this.state.N;
        var neighbors = [];

        var dx = [-1, 0, 1];
        var dy = [-1, 0, 1];
        for (var delta_x in dx){
            for (var delta_y in dy){
                if (!(delta_x == 0 && delta_y == 0)){
                    var x = i + dx[delta_x];
                    var y = j + dy[delta_y];
                    if (x < 0){ x = N-1; }
                    if (x >= N){ x = 0; }
                    if (y < 0){ y = N-1; }
                    if (y >= N){ y = 0; }

                    neighbors.push({x:x,y:y});
                }
            }
        }
        return neighbors;
    }

    pause(){
        this.setState({anim: !this.state.anim});
    }

   update_lattice(){
       var N = this.state.N;
       var C = 0.5;
       var E = 0.0;

       var pred_c = 0.7;
       var pred_e = 0.9;

       var pred = this.state.pred;
       var prey = this.state.prey;
       var lattice = {...this.state.lattice};
       var obj_matrix = this.state.obj_matrix;

      // update pred
      var new_pred = [];
      for (var p in pred){
          var pr = pred[p];
          var x = pr.x;
          var y = pr.y;
          var adj_tiles = obj_matrix[x][y].neighbors;

          for (var adj1 in adj_tiles){
              // check if pred
              var adj1_x = adj_tiles[adj1].x;
              var adj1_y = adj_tiles[adj1].y;

              if (lattice[adj1_x][adj1_y] == 0){
                  var adj1_neighbors = obj_matrix[adj1_x][adj1_y].neighbors;
                  for (var adj2 in adj_tiles){
                      var adj2_x = adj_tiles[adj2].x;
                      var adj2_y = adj_tiles[adj2].y;
                      if (adj2 in adj1_neighbors){
                          if (lattice[adj2_x][adj2_y] == 1){
                              if (Math.random() < pred_c){
                                  var new_pred_cell = {x: adj2_x, y:adj2_y};
                                  if (!(new_pred_cell in new_pred)){
                                      new_pred.push(new_pred_cell);
                                      lattice[adj2_x][adj2_y] = 0;
                                  }
                              }
                          }
                      }
                  }
              }
          }

          if (Math.random() < pred_e){
              //lattice[adj2_x][adj2_y] = 2;
          }
          else {
              var new_pred_cell = {x: x, y:y};
              new_pred.push(new_pred_cell);
              lattice[adj2_x][adj2_y] = 2;
          }

      }

       if (this.state.anim && (prey.length) > 0){

            // update prey
             var new_prey = [];
             for (var p in prey){
                 var pr = prey[p];

                 var x = pr.x;
                 var y = pr.y;
                 var adj_tiles = obj_matrix[x][y].neighbors;

                 if (adj_tiles.length > 0){
                     for (var neighbor in adj_tiles){
                         var neigh_x = adj_tiles[neighbor].x;
                         var neigh_y = adj_tiles[neighbor].y;


                         if (lattice[neigh_x][neigh_y] == 2){
                             if (!(neighbor in new_prey)){
                                 if (Math.random() < C){
                                     lattice[neigh_x][neigh_y] = 1
                                     new_prey.push({x: neigh_x, y:neigh_y})
                                 }
                             }
                         }
                     }
                }

                 // go extinct w/ prob
                 if (Math.random() < E){
                     lattice[x][y] = 2;
                 }
                 else{
                     new_prey.push(prey[p]);
                 }
             }




            this.setState({lattice: lattice, prey: new_prey});

       }



        /*   var N = this.state.N
           var lattice = this.state.lattice;
           var new_lattice = {...lattice};

           for (var i = 0; i < N; i++){
               for (var j = 0; j < N; j++){
                   var new_st = this.get_new_state(lattice,i,j);
                   new_lattice[i][j]  = new_st;
               }
           }
           this.setState({lattice: new_lattice});

   }

   createLattice() {
        var N = this.state.N;
        var x = Math.sin(1010) * 10000;
        var lattice =  [];

        var obj_matrix = [];


        for (var i = 0; i < N; i++){
            var this_lattice_row = [];
            var this_obj_row = [];
            for (var j = 0; j < N; j++){
                var st = Math.round(2*Math.random());
                this_lattice_row.push(st);

                var obj = {x: i, y:j, neighbors: this.get_neighbors(i,j)};
                this_obj_row.push(obj);

            }
            obj_matrix.push(this_obj_row);
            lattice.push(this_lattice_row);
        }


        var pred = [];
        var prey = [];
        for (var i = 0; i < N; i++){
            for (var j = 0; j < N; j++){
                var st = Math.round(2*Math.random());

                lattice[i][j] = st;

                if (st == 0){
                    pred.push({x:i, y:j});
                }
                if (st == 1){
                    prey.push({x:i, y:j});
                }

            }
        }

        //return lattice;
        this.setState({lattice: lattice, obj_matrix: obj_matrix, pred: pred, prey: prey});
   }
 */
