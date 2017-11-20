import angular from 'angular';
import angularMeteor from 'angular-meteor';
import field from '../imports/components/field/field';
import topic from '../imports/components/topic/topic';
import question from '../imports/components/question/question';
import home from '../imports/components/home/home';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
// import ckeditor from "ckeditor"

angular.module('app', [
  angularMeteor,
  uiRouter,
  field.name,
  topic.name,
  home.name,
  question.name
]).config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');
}
