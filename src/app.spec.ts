import { bootstrap } from 'aurelia-bootstrapper';
import { PLATFORM } from 'aurelia-pal';
import { StageComponent } from 'aurelia-testing';
import * as $ from 'jquery';
import { UserService } from 'services/user.service';

export class MockUserService {
  getUsers() {
    return Promise.resolve([{
      id: 1,
      name: 'TestName',
      age: 999,
      city: 'TestCity',
      hobbies: ['Hobby1', 'Hobby2', 'Hobby3']
    }]);
  }
}

describe('MyApp', () => {
    let component;
    let mockUserService = new MockUserService();
  
    beforeEach(() => {
      component = StageComponent
        .withResources(PLATFORM.moduleName('../../src/app'))
        .inView('<app></app>');
  
      component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration();
        aurelia.container.registerInstance(UserService, mockUserService);
      });
    });
  
    it('should render the first user', done => {
      component.create(bootstrap).then(() => {
        const $users = $('.user');

        expect($users.length).toEqual(1);

        expect($users.get(0).textContent).toContain('TestName');
        expect($users.get(0).textContent).toContain('999');
        expect($users.get(0).textContent).toContain('TestCity');
        expect($users.get(0).textContent).toContain('Hobby1');
        expect($users.get(0).textContent).toContain('Hobby2');
        expect($users.get(0).textContent).toContain('Hobby3');
  
        done();
      });
    });

    it('should be able to filter users by hobby', done => {
      component.create(bootstrap).then(() => {
        // TODO
        done();
      });
    });

    it('test other things', done => {
      component.create(bootstrap).then(() => {
        // TODO
        done();
      });
    });
  
    afterEach(() => {
      component.dispose();
    });
  });
