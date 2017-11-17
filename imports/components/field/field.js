import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './field.html';
import { Fields } from '../../api/fields';
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
    if (confirm('Bạn chắc chắn xóa ?')) {
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

