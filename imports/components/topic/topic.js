import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './topic.html';
import uiRouter from 'angular-ui-router';
import { Fields } from '../../api/fields';
import { Topics } from '../../api/topics';
import { Questions } from '../../api/questions';

class TopicCtrl {
    slField;


    constructor($scope, $reactive) {
        $reactive(this).attach($scope);
        $scope.viewModel(this);
        this.selecedField = 'Gdi447anshK3XZ36o';
        this.helpers({
            fields() {
                var f = Fields.find({});
                if (f.fetch().length > 0) {
                    this.slField = f.fetch()[0]._id;
                }
                return f;
            },

            topics: () => {
                return Topics.find({ fieldId: this.getReactively('slField') });
            }
        })
    }
    fields = [];
    addField(newTopic) {
        Topics.insert({
            name: newTopic.name,
            fieldId: this.slField
        })
        this.topic = {};
    }

    selectFieldChange() {
        this.selecedField = this.slField;
    }

    delete(id) {
        if (confirm('Các bài viết thuộc chủ đề cũng sẽ bị xóa ?Bạn chắc chắn xóa ?')) {
            let qs = Questions.find({ topicId: id }).fetch();
            qs.forEach(elm => {
                Questions.remove(elm._id);
            });
            Topics.remove(id);
        }
    }
    edit(id) {
        this.topicEdit = Topics.findOne(id);
        $('#editTopic').modal('show');
    }
    saveChangeEdit(topicEdit) {
        Topics.update(this.topicEdit._id, {
            $set: {
                name: this.topicEdit.name,
                fieldId: this.topicEdit.fieldId
            }
        });
        $('#editTopic').modal('hide');
    }
}

export default angular.module('topic', [
    angularMeteor,

])
    .component('topic', {
        templateUrl: 'imports/components/topic/topic.html',
        controller: TopicCtrl
    }).config(config);
function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('topic', {
            url: '/topic',
            template: '<topic></topic>'
        });
}

