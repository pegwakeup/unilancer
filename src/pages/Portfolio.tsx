import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Palette, LineChart, Globe, Smartphone, Database,
  BrainCircuit, PaintBucket, FileImage, Figma, Monitor,
  Search, Target, BarChart2, ArrowUpRight, ExternalLink,
  Github, Eye, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPortfolioItems, type PortfolioItem } from '../lib/portfolio';
