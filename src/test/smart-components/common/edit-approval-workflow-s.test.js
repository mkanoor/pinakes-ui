import React from 'react';
import { act } from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Modal } from '@patternfly/react-core';
import { shallowToJson } from 'enzyme-to-json';
import { MemoryRouter, Route } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import { useIntl } from 'react-intl';
import { APPROVAL_API_BASE } from '../../../utilities/constants';
import FormRenderer from '../../../smart-components/common/form-renderer';
import EditApprovalWorkflow from '../../../smart-components/common/edit-approval-workflow';
import { mockApi } from '../../../helpers/shared/__mocks__/user-login';

describe('<EditApprovalWorkflow />', () => {
  let initialProps;
  let initialState;
  const middlewares = [thunk, promiseMiddleware, notificationsMiddleware()];
  let mockStore;

  const ComponentWrapper = ({ store, children, initialEntries }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </Provider>
  );

  beforeEach(() => {
    localStorage.setItem('catalog_standalone', true);
    localStorage.setItem('user', 'test');
    initialProps = {
      closeUrl: 'foo',
      portfolioId: '123',
      objectType: 'Portfolio',
      objectName: () => 'Test Resource Name',
      pushParam: { pathname: '/foo', search: '?platform=1' }
    };
    initialState = {
      i18nReducer: {
        ...useIntl()
      },
      portfolioReducer: {
        portfolios: {
          results: [
            {
              id: '123',
              name: 'Portfolio 1'
            }
          ]
        }
      },
      approvalReducer: {
        workflows: {
          results: [
            {
              id: '111',
              name: 'Workflow111'
            },
            {
              id: '222',
              name: 'workflow'
            }
          ]
        },
        resolvedWorkflows: {
          results: [
            {
              id: '111',
              name: 'workflow'
            }
          ]
        }
      }
    };
    mockStore = configureStore(middlewares);
  });

  afterEach(() => {
    localStorage.setItem('catalog_standalone', false);
    localStorage.removeItem('user');
  });

  it('should render correctly', async () => {
    const store = mockStore(initialState);
    mockApi
      .onGet(`${APPROVAL_API_BASE}/workflows`)
      .replyOnce(200, { results: [] });
    let wrapper;
    await act(async () => {
      wrapper = shallow(
        <ComponentWrapper store={store}>
          <EditApprovalWorkflow querySelector="portfolio" {...initialProps} />
        </ComponentWrapper>
      ).dive();
    });
    wrapper.update();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should create the edit workflow modal', async (done) => {
    const store = mockStore(initialState);
    mockApi
      .onGet(
        `${APPROVAL_API_BASE}/workflows?app_name=catalog&object_type=Portfolio&object_id=123&filter[name][contains]=&page_size=50&page=1`
      )
      .replyOnce(200, { results: [{ name: 'workflow', id: '123' }] });

    const expectedSchema = {
      fields: [
        {
          component: componentTypes.SELECT,
          label: '',
          loadOptions: expect.any(Function),
          multi: true,
          isSearchable: true,
          isClearable: true,
          name: 'new-tags',
          resolveProps: expect.any(Function)
        },
        {
          component: 'initial-chips',
          label: 'Current approval processes',
          name: 'initial-tags'
        }
      ]
    };

    let wrapper;
    await act(async () => {
      wrapper = mount(
        <ComponentWrapper
          store={store}
          initialEntries={['/portfolio?portfolio=123']}
        >
          <Route
            path="/portfolio"
            render={(args) => (
              <EditApprovalWorkflow
                querySelector="portfolio"
                {...args}
                {...initialProps}
              />
            )}
          />
        </ComponentWrapper>
      );
    });

    wrapper.update();
    const modal = wrapper.find(Modal);
    const form = wrapper.find(FormRenderer);
    expect(modal.props().title).toEqual('Set approval process');
    expect(form.props().schema).toEqual(expectedSchema);
    done();
  });
});
