'use strict';

describe('Controller: game_of_life', function () {

    beforeEach(module('Game_of_life'));

    var controller;
    var scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('game_of_life', {$scope: scope});
    }));

    describe('On instance', function () {

        var matrix = [];

        it('should set "controller_loaded" variable in scope', function () {
            expect(scope.controller_loaded).toContain('loaded');
        });

        it('should initialize  matrix with 4 rows and 8 columns containing 0 values', function () {
            expect(scope.initialize_matrix(4, 8)).toEqual(
                [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]
                ]
            );
        });

        it('should initialize  matrix with 3 rows and 6 columns containing 0 values', function () {
            expect(scope.initialize_matrix(3, 6)).toEqual(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            );
        });

        it('should turn on input cells noted by [row, [columnss]]', function () {

            scope.initialize_matrix(4,8);
            var initial_cells_to_turn_on = [[0, [3,4]], [1, [2, 5]], [2, [1,2,3,4,5,6]],[3,[2,5]]];

            expect(scope.matrix_turned_on(initial_cells_to_turn_on)).toEqual(
                [
                    [0, 0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0]
                ]
            );
        });

        it('should turn on input cells noted by [row, [columnss]]', function () {

            scope.initialize_matrix(4,8);
            var initial_cells_to_turn_on = [
                [1, [3]],
                [2, [2, 3]]
            ];

            matrix = scope.matrix_turned_on(initial_cells_to_turn_on);

            expect(matrix).toEqual(
                [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]
                ]
            );

        });

        it('should iterate to next generation', function () {

            expect(scope.iterate_matrix(matrix)).toEqual(
                [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]
                ]
            );
        });

        it('should turn on input cells noted by [row, [columnss]]', function () {

            scope.initialize_matrix(5,5);
            var initial_cells_to_turn_on = [
                [2, [1,2,3]]
            ];

            matrix = scope.matrix_turned_on(initial_cells_to_turn_on);

            expect(matrix).toEqual(
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ]
            );

        });

        it('should iterate to next generation', function () {

            expect(scope.iterate_matrix(matrix)).toEqual(
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0]
                ]
            );
        });

        it('should turn on input cells for Beacon (period 2)', function () {

            scope.initialize_matrix(6,6);
            var initial_cells_to_turn_on = [
                [1, [1,2]],
                [2,[1]],
                [3, [4]],
                [4, [3,4]]
            ];

            matrix = scope.matrix_turned_on(initial_cells_to_turn_on);

            expect(matrix).toEqual(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            );

        });

        it('should iterate to next generation of Beacon (period 2)', function () {

            matrix = scope.iterate_matrix(matrix);

            expect(matrix).toEqual(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            );
        });

        it('should iterate to next generation of Beacon (period 2)', function () {

            matrix = scope.iterate_matrix(matrix);

            expect(matrix).toEqual(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0]
                ]
            );
        });

        it('should turn on/off a single cell of the matrix', function () {

            scope.initialize_matrix(3,5);

            expect(scope.turn_single_cell('1,3')).toEqual(
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0]
                ]
            );
        });

        it('should turn on/off a single cell of the matrix', function () {

            scope.initialize_matrix(2,6);

            expect(scope.turn_single_cell('1,5')).toEqual(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1]
                ]
            );
        });

    });

    describe('when going to /game_of_life', function () {

        var route, location, rootScope, httpBackend;

        beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
            httpBackend = $httpBackend;

            httpBackend.when('GET', 'scripts/game_of_life/views/game_of_life.html').respond('<div></div>');
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should use game_of_life.html and controller', function () {
            expect(route.current).toBeUndefined();

            location.path('/game_of_life');

            httpBackend.flush();

            expect(route.current.templateUrl).toBe('scripts/game_of_life/views/game_of_life.html');
            expect(route.current.controller).toBe('game_of_life');
        });
    });

});
