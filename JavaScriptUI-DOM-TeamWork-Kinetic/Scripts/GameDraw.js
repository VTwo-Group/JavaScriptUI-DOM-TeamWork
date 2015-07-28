﻿/// <reference path="lib/kinetic.js" />

var GameDraw = ( function () {

    var backgroundLayer,
        playGroundLayer,
        stage,
        width,
        height,
        CONSTANTS = {
            OBJ_SIZE_X: 60,
            OBJ_SIZE_Y: 52,
            TOP_START_POS_X: 30,
            TOP_START_POS_Y: 31,
            BOTTOM_START_POS_X: 30,
            BOTTOM_START_POS_Y: 537,
        };

    stage = new Kinetic.Stage( {
        container: 'kinetic-container',
        width: 1359,
        height: 639
    } );

    backgroundLayer = new Kinetic.Layer();
    playGroundLayer = new Kinetic.Layer();

    width = stage.getWidth();
    height = stage.getHeight();

    function getPosition( objX, objY ) {
        var x,
            y,
            middleBoard = 0;

        if ( objX < 7 || ( 12 < objX && 18 < objX ) ) {
            middleBoard = 39;
        }

        if ( 13 <= objX && objX < 25 ) {
            x = CONSTANTS.TOP_START_POS_X + ( ( objX - 13 ) * CONSTANTS.OBJ_SIZE_X ) + middleBoard;
            y = CONSTANTS.TOP_START_POS_Y + ( objY * CONSTANTS.OBJ_SIZE_Y );
        } else if ( 1 <= objX && objX < 13 ) {
            x = CONSTANTS.BOTTOM_START_POS_X + ( ( 12 - objX ) * CONSTANTS.OBJ_SIZE_X ) + middleBoard;
            y = CONSTANTS.BOTTOM_START_POS_Y - ( objY * CONSTANTS.OBJ_SIZE_Y );
        }

        return {
            x: x,
            y: y,
        }
    };

    function background() {
        var imageObjBackground = new Image();
        var imageObjBoard = new Image();        

        imageObjBackground.onload = function () {
            var imageBackground = new Kinetic.Image( {
                x: 0,
                y: 0,
                image: imageObjBackground,
                width: width,
                height: height
            } );

            backgroundLayer.add( imageBackground );
            imageBackground.setZIndex( 0 );

            stage.add( backgroundLayer );
            backgroundLayer.setZIndex( 0 );
        };

        imageObjBoard.onload = function () {
            var imageBoard = new Kinetic.Image( {
                x: 10,
                y: 10,
                image: imageObjBoard,
                width: 800,
                height: 600,
                shadowOffsetX: 20,
                shadowOffsetY: 20,
                shadowBlur: 30,
            } );

            backgroundLayer.add( imageBoard );

            stage.add( backgroundLayer );
            backgroundLayer.setZIndex( 0 );
        };
            
        
        imageObjBackground.src = 'Images/wood_background_BlackNWhite_1920x1080.jpg';
        imageObjBoard.src = 'Images/Board800x600.png';
    };

    function createCircle( x, y, color ) {
        var radius = 25;
        var pos = getPosition( x, y );
        var posX = Math.floor( pos.x + ( CONSTANTS.OBJ_SIZE_X / 2 ) );
        var posY = Math.floor( pos.y + ( CONSTANTS.OBJ_SIZE_Y / 2 ) );
        var strokeColor;

        if ( color === 'white' ) {
            strokeColor = 'black';
        } else if ( color === 'black' ) {
            strokeColor = 'white';
        } else {
            strokeColor = 'purple';
        }

        var circle = new Kinetic.Circle( {
            x: posX,
            y: posY,
            radius: radius,
            stroke: strokeColor,            
            fillRadialGradientStartRadius: 0,
            fillRadialGradientEndRadius: radius,
            fillRadialGradientColorStops: [0, 'gray', 1, color],
            draggable: true,
        } );

        playGroundLayer.add( circle );
    };

    //function createRectangle( x, y, color ) {

    //    var pos = getPosition( x, y );
    //    var posX = Math.floor( pos.x );
    //    var posY = Math.floor( pos.y );

    //    var rect = new Kinetic.Rect( {
    //        x: posX,
    //        y: posY,
    //        width: CONSTANTS.OBJ_SIZE_X,
    //        height: CONSTANTS.OBJ_SIZE_Y,
    //        fill: color,
    //        draggable: true,
    //    } );

    //    playGroundLayer.add( rect );
    //};

    

    function playGround() {
        stage.add( playGroundLayer );
        playGroundLayer.setZIndex( 10 );
    };

    return {
        background: background,
        playGround: playGround,
        createCircle: createCircle,
        //createRectangle: createRectangle,
    }
}() );

