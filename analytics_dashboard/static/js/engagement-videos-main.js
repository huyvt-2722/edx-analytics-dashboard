/**
 * Called for displaying a collection of video charts and tables.  Each bar represents a single video.
 */
require(['load/init-page'], (page) => {
  'use strict';

  require(
    ['d3', 'underscore', 'views/data-table-view', 'views/stacked-bar-view'],
    (d3, _, DataTableView, StackedBarView) => {
      const model = page.models.courseModel;
      const graphVideoColumns = [
        {
          key: 'users_at_end',
          percent_key: 'end_percent',
          title: gettext('Complete Views'),
          className: 'text-right',
          type: 'number',
          color: '#58BC4B',
        },
        {
          key: 'start_only_users',
          percent_key: 'start_only_percent',
          title: gettext('Incomplete Views'),
          className: 'text-right',
          type: 'number',
          color: '#9B9B9B',
        },
      ];
      let tableColumns = [
        {
          key: 'index', title: gettext('Order'), type: 'number', className: 'text-right',
        },
        { key: 'name', title: model.get('contentTableHeading'), type: 'hasNull' },
      ];
      let videoChart;
      let videoTable;

      tableColumns = tableColumns.concat(graphVideoColumns);
      tableColumns.push({
        key: 'end_percent',
        title: gettext('Completion Percentage'),
        className: 'text-right',
        type: 'percent',
      });

      if (model.get('hasData')) {
        videoChart = new StackedBarView({
          el: '#chart-view',
          model,
          modelAttribute: 'primaryContent',
          trends: graphVideoColumns,
        });
        videoChart.renderIfDataAvailable();
      }

      videoTable = new DataTableView({
        el: '[data-role=data-table]',
        model,
        modelAttribute: 'primaryContent',
        columns: tableColumns,
        sorting: ['index'],
        replaceZero: '-',
      });
      videoTable.renderIfDataAvailable();
    },
  );
});
