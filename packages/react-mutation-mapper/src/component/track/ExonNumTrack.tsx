import * as React from 'react';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import { computed, makeObservable } from 'mobx';

import { OncoKbFilterValue } from '../../filter/OncoKbFilter';
import { DataFilterType } from '../../model/DataFilter';
import MutationMapperStore from '../../model/MutationMapperStore';
import { OncoKbTrackTooltip } from './OncoKbTrackTooltip';
import { default as Track, TrackProps } from './Track';
import { TrackItemSpec } from './TrackCircle';
import { TrackRectSpec } from './TrackRect';
import { Mutation } from 'cbioportal-utils';

import oncoKbImg from '../../images/oncogenic-only.svg';

type ExonNumTrackProps = TrackProps & {
    store: MutationMapperStore<Mutation>;
};

const ONCOKB_ID_CLASS_PREFIX = 'onco-kb-';

export function getOncoKbImage() {
    return <img src={oncoKbImg} alt="OncoKB Oncogenic Symbol" />;
}

@observer
export default class ExonNumTrack extends React.Component<
    ExonNumTrackProps,
    {}
> {
    constructor(props: any) {
        super(props);
        makeObservable(this);
    }

    // @computed get oncoKbSpecs(): TrackRectSpec[] {
    //     const filteredOncoKbDataByProteinPosStart = this.props.store
    //         .oncoKbDataByPosition;

    //     if (!_.isEmpty(filteredOncoKbDataByProteinPosStart)) {
    //         return _.keys(filteredOncoKbDataByProteinPosStart)
    //             .filter(position => Number(position) >= 0)
    //             .map(position => ({
    //                 codon: Number(position),
    //                 color: '#007FFF',
    //                 tooltip: (
    //                     <OncoKbTrackTooltip
    //                         usingPublicOncoKbInstance={
    //                             this.props.store.usingPublicOncoKbInstance
    //                         }
    //                         mutations={
    //                             this.props.store.mutationsByPosition[
    //                                 Number(position)
    //                             ]
    //                         }
    //                         indicatorData={
    //                             filteredOncoKbDataByProteinPosStart[
    //                                 Number(position)
    //                             ]
    //                         }
    //                         hugoGeneSymbol={
    //                             this.props.store.gene.hugoGeneSymbol
    //                         }
    //                     />
    //                 ),
    //             }));
    //     } else {
    //         return [];
    //     }
    // }

    @computed get ExonNumSpecs(): TrackRectSpec[] {
        const data = [
            [1, 0.5842255531763026, 0],
            [2, 0.0542469664525339, 0.5842255531763026],
            [3, 0.0417558886509636, 0.6384725196288366],
            [4, 0.10920770877944326, 0.6802284082798001],
            [5, 0.05174875089221984, 0.7894361170592434],
            [6, 0.046752319771591715, 0.8411848679514633],
            [7, 0.05638829407566024, 0.887937187723055],
            [8, 0.055674518201284794, 0.9443254817987152],
        ];
        return data.map((exon: number[]) => ({
            color: '#007FFF',
            start: this.props.proteinLength * exon[2],
            rectWidth: this.props.proteinLength * exon[1] - 5,
        }));
        // const filteredOncoKbDataByProteinPosStart = this.props.store
        //     .oncoKbDataByPosition;

        // if (!_.isEmpty(filteredOncoKbDataByProteinPosStart)) {
        //     return _.keys(filteredOncoKbDataByProteinPosStart)
        //         .filter(position => Number(position) >= 0)
        //         .map(position => ({
        //             codon: Number(position),
        //             color: '#007FFF',
        //             tooltip: (
        //                 <OncoKbTrackTooltip
        //                     usingPublicOncoKbInstance={
        //                         this.props.store.usingPublicOncoKbInstance
        //                     }
        //                     mutations={
        //                         this.props.store.mutationsByPosition[
        //                             Number(position)
        //                         ]
        //                     }
        //                     indicatorData={
        //                         filteredOncoKbDataByProteinPosStart[
        //                             Number(position)
        //                         ]
        //                     }
        //                     hugoGeneSymbol={
        //                         this.props.store.gene.hugoGeneSymbol
        //                     }
        //                 />
        //             ),
        //         }));
        // } else {
        //     return [];
        // }
    }

    @computed get trackTitle() {
        return (
            <span>
                <span style={{ marginRight: 2 }}>{getOncoKbImage()}</span>
                Exon Number
            </span>
        );
    }

    public render() {
        return (
            <Track
                dataStore={this.props.dataStore}
                defaultFilters={[
                    {
                        type: DataFilterType.ONCOKB,
                        values: [OncoKbFilterValue.Oncogenic],
                    },
                ]}
                width={this.props.width}
                xOffset={this.props.xOffset}
                proteinLength={this.props.proteinLength}
                trackTitle={this.trackTitle}
                trackRect={this.ExonNumSpecs}
                idClassPrefix={ONCOKB_ID_CLASS_PREFIX}
            />
        );
    }
}
