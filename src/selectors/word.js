import { createSelector } from 'reselect';
import { minNewId } from 'reducers/word';
import _max from 'lodash/max';
import _maxBy from 'lodash/maxBy';


const getList = state => state.word.list;


export const getNextNewId = createSelector(
    getList,
    list => _max([...list.map(item => item.id + 1), minNewId])
);

export const getLatestLabel = createSelector(
    getList,
    (list) => {
        const latest = _maxBy(list, item => item.id);
        return (latest && latest.label) ? latest.label : '';
    },
);
