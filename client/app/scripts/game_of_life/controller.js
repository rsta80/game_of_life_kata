'use strict';

angular.module('Game_of_life')
    .controller('game_of_life', function ($scope) {

        $scope.controller_loaded = 'Game of life loaded!';
        $scope.matrix = [0];
        $scope.glidder_pattern = [[1, [1]], [2, [2, 3]], [3, [1, 2]]];
        $scope.r_pentomino = [[3, [4, 5]], [4, [3, 4]], [5, [4]]];
        $scope.pulsar_pattern = [
            [1, [3, 4, 10, 11]],
            [2, [4, 5, 9, 10]],
            [3, [1, 4, 6, 8, 10, 13]],
            [4, [1, 2, 3, 5, 6, 8, 9, 11, 12, 13]],
            [5, [2, 4, 6, 8, 10, 12]],
            [6, [3, 4, 5, 9, 10, 11]],
            [8, [3, 4, 5, 9, 10, 11]],
            [9, [2, 4, 6, 8, 10, 12]],
            [10, [1, 2, 3, 5, 6, 8, 9, 11, 12, 13]],
            [11, [1, 4, 6, 8, 10, 13]],
            [12, [4, 5, 9, 10]],
            [13, [3, 4, 10, 11]]];


        $scope.initialize_matrix = function (row_number, col_number) {

            $scope.matrix = [];
            for (var row = 0; row < row_number; row++) {
                $scope.matrix[row] = [];
                for (var col = 0; col < col_number; col++) {
                    $scope.matrix[row][col] = 0;
                }
            }
            return $scope.matrix;
        };

        $scope.matrix_turned_on = function (array_turn_on) {

            for (var row = 0; row < array_turn_on.length; row++) {
                updated_row($scope.matrix[array_turn_on[row][0]], array_turn_on[row][1]);
            }

            return $scope.matrix;
        };

        $scope.iterate_matrix = function (matrix) {

            var old_matrix = matrix;
            $scope.matrix = [];

            for (var row = 0; row < old_matrix.length; row++) {
                $scope.matrix[row] = [];
                for (var col = 0; col < old_matrix[row].length; col++) {
                    $scope.matrix[row][col] = cell_change_state(row, col, old_matrix);
                }
            }

            return $scope.matrix;
        };

        $scope.turn_single_cell = function (cell) {

            var cell_array = cell.split(',');

            if ($scope.matrix[cell_array[0]][cell_array[1]] === 0) {
                $scope.matrix[cell_array[0]][cell_array[1]] = 1;
            }
            else if ($scope.matrix[cell_array[0]][cell_array[1]] === 1) {
                $scope.matrix[cell_array[0]][cell_array[1]] = 0;
            }
            return $scope.matrix;

        };

        $scope.set_demo_pattern = function (pattern, matrix_long) {
            $scope.initialize_matrix(matrix_long, matrix_long);
            $scope.matrix_turned_on(pattern);
        };

        function updated_row(row, cells_in_row) {

            for (var cell = 0; cell < cells_in_row.length; cell++) {
                row[cells_in_row[cell]] = 1;
            }

        }

        function cell_change_state(row, col, matrix) {

            var count = count_cell_neighbors(row, col, matrix);
            if (matrix[row][col] === 1 && !( (count === 2) || (count === 3) )) {
                return 0;
            }
            else if (matrix[row][col] === 0 && count === 3) {
                return 1;
            }
            return matrix[row][col];

        }

        function count_cell_neighbors(row, col, matrix) {

            var count = 0;
            for (var row_neighbor = (row - 1); row_neighbor <= (row + 1); row_neighbor++) {
                if (row_neighbor === -1 || row_neighbor === matrix.length) {
                    continue;
                }
                for (var col_neighbor = (col - 1); col_neighbor <= (col + 1); col_neighbor++) {
                    if (col_neighbor === -1 || col_neighbor === matrix[row].length) {
                        continue;
                    }
                    if (row_neighbor === row && col_neighbor === col) {
                        continue;
                    }
                    if (matrix[row_neighbor][col_neighbor] === 1) {
                        count++;
                    }
                }
            }
            return count;

        }

    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/game_of_life', {
                templateUrl: 'scripts/game_of_life/views/game_of_life.html',
                controller: 'game_of_life'
            });
    });
