import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './field.html';
import { Fields } from '../../api/fields';
import { Topics } from '../../api/topics';
import { Questions } from '../../api/questions';
import uiRouter from 'angular-ui-router';

class FieldCtrl {
  fieldEdit = {};
  constructor($scope) {

    $scope.viewModel(this);
    this.helpers({
      fields() {
        return Fields.find({});
      }
    })
  }

  addField(field) {
    Fields.insert({
      name: field.name,
    });
    this.field = {};
  }
  delete(id) {
    if (confirm('Các chủ đề và bài viết thuộc lĩnh vực cũng sẽ bị xóa bỏ ? Bạn chắc chắn xóa ? ')) {
      //
      let ts = Topics.find({ fieldId: id }).fetch()
      ts.forEach(element => {
        console.log(element._id);

        let qs = Questions.find({ topicId: element._id }).fetch();
        qs.forEach(elm => {
          Questions.remove(elm._id);
        });
        Topics.remove(element._id);
      });

      Fields.remove(id);
    }
  }
  edit(id) {
    this.fieldEdit = Fields.findOne(id);
    $('#EditFieldModal').modal('show');
  }
  saveChanges() {
    Fields.update(this.fieldEdit._id, {
      $set: {
        name: this.fieldEdit.name
      },
    });
    this.fieldEdit = {};
    $('#EditFieldModal').modal('hide');
  }
}

export default angular.module('field', [
  angularMeteor,

])
  .component('field', {
    templateUrl: 'imports/components/field/field.html',
    controller: FieldCtrl
  }).config(config);
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('field', {
      url: '/field',
      template: '<field></field>'
    })
}

