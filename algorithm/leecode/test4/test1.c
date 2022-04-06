double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size){
    if(NULL == nums1 || NULL == nums2)
    {
        return 0;
    }
    int totalnum = nums1Size + nums2Size;
    int len1 = nums1Size;
    int len2 = nums2Size;
    int start1 = 0;
    int start2 = 0;
    int mid1 = 0;
    int mid2 = 0;
    int middlenum = totalnum/2;
    int numk = middlenum;
    int middley = totalnum%2;
    int middlesolution = 0;
    int middlesolution1 = 0;
    int factor = middlenum/2;

    while(factor > 1){
        if(len1 < factor){
            mid2 = factor - len1;
            factor = 0;
            middlesolution = nums2[start2 + mid2 - 1];
            middlesolution1 = nums2[start2 + mid2];
            break;
        }            
        if(len2 < factor){
            mid1 = factor - len2;
            factor = 0;
            middlesolution = nums1[start1 + mid1 - 1];
            middlesolution1 = nums1[len1 + mid1];            
            break;
        }
        if(nums2[factor] > nums1[factor]){
             len1 = len1 - factor;
             start1 = start1 + factor;
        }else{
             len2 = len2 - factor;
             start2 = start2 + factor;
        }
        numk = numk - factor;
        factor = numk/2;
    }
    if(1 == factor){
        if(nums2[factor] > nums1[factor]){
            middlesolution = nums2[factor];
            middlesolution1 = nums2[factor + 1];
        }else{
            middlesolution = nums1[factor];
            middlesolution1 = nums1[factor + 1];
        }
    }

    if(middley){
        return (double)middlesolution;            
    }else{
        return ((double)middlesolution  + (double)middlesolution1)/2;       
    }

}
