import React from 'react'
import RichTextReadOnly from '../../Commons/Editor'
import { ShadowBox } from './LawOrderStyled'
import { initialNotesValue } from './Constants'

export default function Combine_Lesson() {
    return (
        <div>
            <h3>Lesson's Learned</h3>
            <ShadowBox>
                <RichTextReadOnly value={initialNotesValue} />
            </ShadowBox>
        </div>
    )
}