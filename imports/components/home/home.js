import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './home.html';
import uiRouter from 'angular-ui-router';
import { Fields } from '../../api/fields';
import { Topics } from '../../api/topics';
import { Questions } from '../../api/questions';
import { Meteor } from 'meteor/meteor';

class HomeCtrl {
    slField = 'all';
    slTopic = 'all';
    keySearch = '';
    strKeyword = '';

    constructor($scope, $reactive,$sce) {

        $reactive(this).attach($scope);
        $scope.viewModel(this);
        this.helpers({
            fields() {
                var f = Fields.find({});
                // if (f.fetch().length > 0) {
                //     this.slField = f.fetch()[0]._id;
                // }
                return f;
            },

            topics: () => {
                this.slTopic = 'all';
                if (this.getReactively('slField') == 'all') {
                    return Topics.find({});
                } else
                    return Topics.find({ fieldId: this.getReactively('slField') });
            },
            questions: () => {
                if (this.getReactively('slTopic') == 'all' && this.getReactively('slTopic') == 0) {
                    return Questions.find({}).fetch();
                } else {
                    if (this.getReactively('slTopic') == 'all' && this.getReactively('slTopic') != 0) {
                        return Questions.find({ $or: [{ question: new RegExp('.*' + this.getReactively('keySearch') + '.*', "i") }, { answer: new RegExp('.*' + this.getReactively('keySearch') + '.*', "i") }] }).fetch();
                    } else {
                        return Questions.find({ topicId: this.getReactively('slTopic'), $or: [{ question: new RegExp('.*' + this.getReactively('keySearch') + '.*', "i") }, { answer: new RegExp('.*' + this.getReactively('keySearch') + '.*', "i") }] }).fetch();
                    }
                }
                //return results;
            }
        })
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };
    }

    search() {
        this.keySearch = this.strKeyword;
    }
}

export default angular.module('home', [
    angularMeteor,

])
    .component('home', {
        templateUrl: 'imports/components/home/home.html',
        controller: HomeCtrl
    }).config(config);
function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>'
        });
}

