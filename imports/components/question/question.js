import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './question.html';
import uiRouter from 'angular-ui-router';
import { Fields } from '../../api/fields';
import { Topics } from '../../api/topics';
import { Questions } from '../../api/questions';

class QuestionCtrl {
    slField;


    constructor($scope, $reactive, $sce) {
        $reactive(this).attach($scope);
        $scope.viewModel(this);
        this.helpers({
            fields() {
                var f = Fields.find({});
                if (f.fetch().length > 0) {
                    this.slField = f.fetch()[0]._id;
                }
                return f;
            },

            topics: () => {
                var t = Topics.find({ fieldId: this.getReactively('slField') });
                if (t.fetch().length > 0) {
                    this.slTopic = t.fetch()[0]._id;
                }
                return Topics.find({ fieldId: this.getReactively('slField') });
            },

            questions: () => {
                return Questions.find({ topicId: this.getReactively('slTopic') });
            }
        })
        $scope.ckeditorOption = {
            //languague: 'vi',
            // height:'300px',
        };
        CKEDITOR.replace('answer');
        CKEDITOR.replace('answerEdit');
        // CKEDITOR.replace('textarea', {
        //     height: 260
        // });
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };
    }

    addQuestion(newItem) {
        Questions.insert({
            question: newItem.question,
            answer: CKEDITOR.instances.answer.getData(),
            topicId: this.slTopic
        });
        this.item = {};
        CKEDITOR.instances.answer.setData('')
        //alert(CKEDITOR.instances.answer.getData());
        //console.log(this.item);
        //console.log(newItem)
    }

    selectFieldChange() {
        this.selecedField = this.slField;
    }

    delete(id) {
        if (confirm('Bạn chắc chắn xóa ?')) {
            Questions.remove(id);
        }
    }
    edit(id) {
        this.questionEdit = Questions.findOne(id);
        this.slEditField = Topics.findOne(this.questionEdit.topicId).fieldId;
        this.arrField = Fields.find({}).fetch();

        this.arrTopic = Topics.find({ fieldId: this.slEditField }).fetch();

        CKEDITOR.instances.answerEdit.setData(this.questionEdit.answer);
        $('#editTopic').modal('show');
    }

    saveChangeEdit(questionEdit) {
        Questions.update(questionEdit._id, {
            $set: {
                question: questionEdit.question,
                answer: CKEDITOR.instances.answerEdit.getData(),
                topicId: questionEdit.topicId
            }
        });
        $('#editTopic').modal('hide');
    }
    selectFieldEditChange() {
        this.arrTopic = Topics.find({ fieldId: this.slEditField }).fetch();
    }

}

export default angular.module('question', [
    angularMeteor,
])
    .component('question', {
        templateUrl: 'imports/components/question/question.html',
        controller: QuestionCtrl
    }).config(config);
function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('question', {
            url: '/question',
            template: '<question></question>'
        });
}

