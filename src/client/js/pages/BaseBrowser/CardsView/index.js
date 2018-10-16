import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import { connect } from 'react-redux'
import { loadBaseCards } from 'client/js/reducers/base.js'
import { addCardsFromBase } from 'client/js/reducers/card.js'
import { getBaseCardsToAdd } from 'client/js/selectors/common.js'
import Loader from '@ieremeev/loader'
import notification from '@ieremeev/notification'
import AudioLink from 'client/js/components/AudioLink'
import { isLoggedIn } from 'client/js/utils/auth.js'
import classnames from 'classnames'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        list: PropTypes.array,
        cardsLoaded: PropTypes.bool,
        loadBaseCards: PropTypes.func,
        addCardsFromBase: PropTypes.func,
        baseCardsToAdd: PropTypes.array,
    }

    state = {
        loading: false,
        adding: false,
    }

    componentDidMount = async () => {
        if (!this.props.cardsLoaded) {
            this.setState({ loading: true })
            await this.props.loadBaseCards(this.props.base.id)
            this.setState({ loading: false })
        }
    }

    addCards = async () => {
        this.setState({ adding: true })
        await this.props.addCardsFromBase(this.props.base.id)
        this.setState({ adding: false })
        notification('Все новые слова добавлены')
    }

    render() {
        const { adding, loading } = this.state
        const newCardsCount = this.props.baseCardsToAdd.length
        const noNewCards = newCardsCount === 0

        const columns = [
            {
                name: 'text',
                label: 'Text',
                filter: true,
                sort: true,
                render: (value, row) => <AudioLink text={value} audioUrl={row.usSoundFile} />,
            },
            {
                name: 'translate',
                label: 'Translate',
                filter: true,
                sort: true,
                render: (value, row) => <AudioLink text={value} audioUrl={row.ruSoundFile} />,
            },
        ]

        if (isLoggedIn()) {
            columns.push({
                name: 'isNew',
                label: 'Новое?',
                className: 'center aligned',
                render: (value, row) =>
                    this.props.baseCardsToAdd.includes(row.id) ? (
                        <i className="icon-checkmark" />
                    ) : null,
            })
        }

        return (
            <div>
                <Loader type="inline" loading={loading}>
                    {isLoggedIn() && (
                        <div className="margin1">
                            {noNewCards && (
                                <div className="ui warning message">Все карточки уже добавлены</div>
                            )}
                            <button
                                id="addCardsFromBaseButton"
                                className={classnames(
                                    'ui',
                                    {
                                        loading: adding,
                                        disabled: noNewCards,
                                    },
                                    'compact primary button'
                                )}
                                style={{ position: 'relative' }}
                                onClick={this.addCards}
                            >
                                Добавить все новые карточки
                                {!noNewCards && (
                                    <div className="floating ui small red label">
                                        {newCardsCount}
                                    </div>
                                )}
                            </button>
                        </div>
                    )}
                    <Table data={this.props.list} columns={columns} showRowNumber />
                </Loader>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const baseId = props.base.id

    return {
        cardsLoaded: !!state.app.base.cards.find(item => item.baseId === baseId),
        list: state.app.base.cards.filter(item => item.baseId === baseId),
        baseCardsToAdd: getBaseCardsToAdd(state),
    }
}

export default connect(mapStateToProps, { loadBaseCards, addCardsFromBase })(ShowBase)
