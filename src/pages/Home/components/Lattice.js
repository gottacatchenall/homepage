import React, { Component } from 'react'
import './Lattice.sass'

class Lattice extends Component {
   constructor(props){
      super(props);
      this.createLattice = this.createLattice.bind(this);
      this.update_lattice = this.update_lattice.bind(this);
      this.get_new_state = this.get_new_state.bind(this);
      this.get_neighbors = this.get_neighbors.bind(this);
      this.pause = this.pause.bind(this);
      this.state = { lattice: null, anim: 1, N:25, pred: [], prey: [] }
   }

   componentWillMount() {
        this.createLattice();
   }

   componentDidMount() {
       setInterval(this.update_lattice, 100);
   }
   componentWillUnmount() {
          clearInterval(this.interval);
    }

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
                 //  console.log(x,y,i,j)


                  // if (lattice[x][y] == st){
                       neighbors.push({x:x,y:y});
                  // }
               }
           }
       }
       return neighbors;
   }

   get_new_state(lattice, i, j){
       // lotka volterra
       // state 2 == empty
       // state 1 == prey
       // state 0 == predator

       var C = 0.2
       var E = 0.1
       var spatial_scale = 1

       if (lattice[i][j] == 1){
          if (Math.random() < (E)){
              return 0;
          }
       }

       if (lattice[i][j] == 0){
          var occupied_neighbors = this.ct_occupied_neighbors(i, j, 0);
          for (var n = 0; n < occupied_neighbors; n++){
             if (Math.random() < C/4){
                 return 1;
             }
          }
       }

       return lattice[i][j];
   }

   pause(){
       this.setState({anim: !this.state.anim})
   }


   update_pred(pred, prey){
       // 2 adjacent predators must be adjacent to one prey
       // replace prey w/ prob

       // go extinct w/ prob

   }

   update_lattice(){
       var N = this.state.N;
       var C = 0.5;
       var E = 0.05;

       var pred_c = 0.7;
       var pred_e = 0.9;

       var pred = this.state.pred;
       var prey = this.state.prey;
       var lattice = {...this.state.lattice};
       var obj_matrix = this.state.obj_matrix;

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

            // update pred
            var new_pred = [];
            for (var p in pred){
                var pr = pred[p];
                var x = pr.x;
                var y = pr.y;
                var adj_tiles = obj_matrix[x][y].neighbors;

                for (var adj1 in adj_tiles){
                    // check if pred
                    var adj1_x = adj_tiles[adj1].x
                    var adj1_y = adj_tiles[adj1].y
                    if (lattice[adj1_x][adj1_y] == 0){
                        var adj1_neighbors = obj_matrix[adj1_x][adj1_y].neighbors;
                        for (var adj2 in adj_tiles){
                            var adj2_x = adj_tiles[adj2].x
                            var adj2_y = adj_tiles[adj2].y
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
                    lattice[adj2_x][adj2_y] = 2;
                }
                else {
                    var new_pred_cell = {x: x, y:y};
                    if (!(new_pred_cell in new_pred)){
                        new_pred.push(new_pred_cell);
                        lattice[adj2_x][adj2_y] = 0;
                    }
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
           this.setState({lattice: new_lattice});*/

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
   //

   render() {
       var N = this.state.N;
       var lattice = this.state.lattice;
       var side_vector = Array.from(Array(N).keys());
       var rows = [];
       side_vector.forEach((i) => {
           var this_row = [];
           side_vector.forEach((j) => {
               var state = "state".concat(lattice[i][j]);
               this_row.push(<div className="cell"><span className={state}></span></div>);
           });
           rows.push(<div className="row">{this_row}</div>)
       });
       return (<div><div className="lattice">{rows}</div>  <div className="pause_button" onClick={this.pause}>pause</div></div>);
   }
}

export default Lattice;
