'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import getStrapiContent from '@/strapi'
import './LoadingOverlay.css'

export default function LoadingOverlay() {
    return (
        <div className="loading-overlay">

        </div>
    )
}
